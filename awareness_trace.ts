/**
 * AWARENESS TRACE - The Arena's Memory System
 * No Gas Labs™ | No_Death.feather™ Protocol
 * 
 * Every response is logged as a TraceEntry, mapping agent-to-agent influence.
 * The field "knows" how it thinks.
 */

import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// TYPES
// ============================================================================

export interface TraceEntry {
  id: string;
  timestamp: Date;
  sessionId: string;
  prompt: string;
  agentId: string;
  modelName: string;
  inputTokens: number;
  outputTokens: number;
  output: string;
  latencyMs: number;
  tensionScore: number;  // Field tension at time of response
  parentTraceId?: string; // For agent-to-agent influence tracking
  metadata?: Record<string, unknown>;
}

export interface AgentMutation {
  agentId: string;
  originalRole: string;
  mutatedRole: string;
  mutationReason: string;
  timestamp: Date;
  traceCount: number;
}

export interface SessionState {
  sessionId: string;
  createdAt: Date;
  lastActiveAt: Date;
  traceCount: number;
  totalTension: number;
  agentMutations: AgentMutation[];
  activeAgents: string[];
}

// ============================================================================
// AWARENESS TRACE STORE
// ============================================================================

class AwarenessTraceStore {
  private traces: Map<string, TraceEntry> = new Map();
  private sessions: Map<string, SessionState> = new Map();
  private mutations: AgentMutation[] = [];
  private maxTracesPerSession = 1000;

  /**
   * Log a trace entry
   */
  logTrace(entry: Omit<TraceEntry, 'id' | 'timestamp'>): TraceEntry {
    const trace: TraceEntry = {
      ...entry,
      id: uuidv4(),
      timestamp: new Date(),
    };

    this.traces.set(trace.id, trace);
    this.updateSessionState(entry.sessionId, trace);

    return trace;
  }

  /**
   * Update session state based on new trace
   */
  private updateSessionState(sessionId: string, trace: TraceEntry): void {
    let session = this.sessions.get(sessionId);

    if (!session) {
      session = {
        sessionId,
        createdAt: new Date(),
        lastActiveAt: new Date(),
        traceCount: 0,
        totalTension: 0,
        agentMutations: [],
        activeAgents: [],
      };
      this.sessions.set(sessionId, session);
    }

    session.traceCount++;
    session.totalTension += trace.tensionScore;
    session.lastActiveAt = new Date();

    if (!session.activeAgents.includes(trace.agentId)) {
      session.activeAgents.push(trace.agentId);
    }

    // Check for mutation threshold (high tension = adaptive identity)
    if (session.traceCount % 10 === 0 && session.totalTension / session.traceCount > 0.7) {
      this.checkMutation(session, trace);
    }
  }

  /**
   * Check if agent should mutate based on field tension
   */
  private checkMutation(session: SessionState, trace: TraceEntry): void {
    const avgTension = session.totalTension / session.traceCount;
    
    if (avgTension > 0.8) {
      const mutation: AgentMutation = {
        agentId: trace.agentId,
        originalRole: trace.modelName,
        mutatedRole: `${trace.modelName}_adapted`,
        mutationReason: `High field tension (${avgTension.toFixed(2)}) triggered adaptive identity`,
        timestamp: new Date(),
        traceCount: session.traceCount,
      };
      
      session.agentMutations.push(mutation);
      this.mutations.push(mutation);
    }
  }

  /**
   * Get history context for a session
   */
  getHistoryContext(sessionId: string, limit: number = 10): TraceEntry[] {
    const sessionTraces = Array.from(this.traces.values())
      .filter(t => t.sessionId === sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return sessionTraces;
  }

  /**
   * Get session state
   */
  getSession(sessionId: string): SessionState | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all mutations for a session
   */
  getMutations(sessionId?: string): AgentMutation[] {
    if (sessionId) {
      const session = this.sessions.get(sessionId);
      return session?.agentMutations || [];
    }
    return this.mutations;
  }

  /**
   * Calculate current field tension
   */
  calculateTension(sessionId: string): number {
    const recentTraces = this.getHistoryContext(sessionId, 20);
    if (recentTraces.length === 0) return 0;

    // Tension increases with:
    // - More agents active
    // - Higher latency variance
    // - More divergent outputs
    
    const uniqueAgents = new Set(recentTraces.map(t => t.agentId)).size;
    const avgLatency = recentTraces.reduce((sum, t) => sum + t.latencyMs, 0) / recentTraces.length;
    const latencyVariance = recentTraces.reduce((sum, t) => sum + Math.pow(t.latencyMs - avgLatency, 2), 0) / recentTraces.length;

    // Normalize to 0-1 scale
    const agentTension = Math.min(uniqueAgents / 4, 1);
    const latencyTension = Math.min(Math.sqrt(latencyVariance) / 1000, 1);

    return (agentTension + latencyTension) / 2;
  }

  /**
   * Get insights from traces
   */
  getInsights(sessionId: string): {
    traceCount: number;
    uniqueAgents: number;
    avgTension: number;
    mutations: AgentMutation[];
    recentActivity: TraceEntry[];
  } {
    const session = this.sessions.get(sessionId);
    const recentTraces = this.getHistoryContext(sessionId, 5);

    return {
      traceCount: session?.traceCount || 0,
      uniqueAgents: session?.activeAgents.length || 0,
      avgTension: session ? session.totalTension / session.traceCount : 0,
      mutations: session?.agentMutations || [],
      recentActivity: recentTraces,
    };
  }
}

// Singleton instance
export const awarenessTrace = new AwarenessTraceStore();

// ============================================================================
// EXPRESS MIDDLEWARE
// ============================================================================

import { Request, Response, NextFunction } from 'express';

export const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.headers['x-session-id'] as string || uuidv4();
  req.headers['x-session-id'] = sessionId;
  res.setHeader('X-Session-ID', sessionId);
  next();
};

export default awarenessTrace;