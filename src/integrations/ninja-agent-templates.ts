/**
 * NINJA AGENT TEMPLATES
 * Factory for creating specialized ninja agents for ARENA orchestration
 * 
 * No Gas Labs™ | No_Death.feather™ Protocol
 */

// ============================================================================
// NINJA ROLES
// ============================================================================

export const NINJA_ROLES = {
  ORCHESTRATOR: 'ORCHESTRATOR',
  ANALYZER: 'ANALYZER',
  DECISION_MAKER: 'DECISION_MAKER',
  MONITOR: 'MONITOR',
  EXECUTOR: 'EXECUTOR',
} as const;

export type NinjaRole = typeof NINJA_ROLES[keyof typeof NINJA_ROLES];

// ============================================================================
// AGENT INTERFACES
// ============================================================================

export interface NinjaAgentConfig {
  maxConcurrentTasks?: number;
  analysisDepth?: 'quick' | 'detailed' | 'deep';
  decisionTimeout?: number;
  retryAttempts?: number;
}

export interface NinjaAgent {
  name: string;
  role: NinjaRole;
  config: NinjaAgentConfig;
  status: 'idle' | 'working' | 'error';
  lastActivity?: Date;
}

// ============================================================================
// AGENT FACTORY
// ============================================================================

export class NinjaAgentFactory {
  private static agents: Map<string, NinjaAgent> = new Map();

  static createAgent(role: NinjaRole, config: NinjaAgentConfig = {}): NinjaAgent {
    const agentId = `${role.toLowerCase()}-${Date.now()}`;
    
    const agent: NinjaAgent = {
      name: agentId,
      role,
      config: {
        maxConcurrentTasks: 5,
        analysisDepth: 'detailed',
        decisionTimeout: 10000,
        retryAttempts: 3,
        ...config,
      },
      status: 'idle',
      lastActivity: new Date(),
    };

    this.agents.set(agentId, agent);
    return agent;
  }

  static getAgent(agentId: string): NinjaAgent | undefined {
    return this.agents.get(agentId);
  }

  static getAllAgents(): NinjaAgent[] {
    return Array.from(this.agents.values());
  }

  static removeAgent(agentId: string): boolean {
    return this.agents.delete(agentId);
  }

  static updateAgentStatus(agentId: string, status: NinjaAgent['status']): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
      agent.lastActivity = new Date();
    }
  }
}

// ============================================================================
// ROLE-SPECIFIC AGENT BEHAVIORS
// ============================================================================

export interface AgentTask {
  id: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  payload: Record<string, unknown>;
  createdAt: Date;
}

export interface AgentResult {
  taskId: string;
  agentId: string;
  success: boolean;
  output?: unknown;
  error?: string;
  completedAt: Date;
}

/**
 * Base agent processor - can be extended for specific roles
 */
export abstract class NinjaAgentProcessor {
  protected agent: NinjaAgent;

  constructor(agent: NinjaAgent) {
    this.agent = agent;
  }

  abstract process(task: AgentTask): Promise<AgentResult>;
}

/**
 * Orchestrator processor - coordinates multiple agents
 */
export class OrchestratorProcessor extends NinjaAgentProcessor {
  async process(task: AgentTask): Promise<AgentResult> {
    NinjaAgentFactory.updateAgentStatus(this.agent.name, 'working');
    
    try {
      // Orchestrator logic: coordinate sub-agents
      const result = {
        taskId: task.id,
        agentId: this.agent.name,
        success: true,
        output: {
          coordinated: true,
          taskType: task.type,
          priority: task.priority,
        },
        completedAt: new Date(),
      };

      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'idle');
      return result;
    } catch (error) {
      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'error');
      return {
        taskId: task.id,
        agentId: this.agent.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      };
    }
  }
}

/**
 * Analyzer processor - performs detailed analysis
 */
export class AnalyzerProcessor extends NinjaAgentProcessor {
  async process(task: AgentTask): Promise<AgentResult> {
    NinjaAgentFactory.updateAgentStatus(this.agent.name, 'working');
    
    try {
      // Analyzer logic: deep analysis of data
      const result = {
        taskId: task.id,
        agentId: this.agent.name,
        success: true,
        output: {
          analyzed: true,
          depth: this.agent.config.analysisDepth,
          findings: [],
        },
        completedAt: new Date(),
      };

      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'idle');
      return result;
    } catch (error) {
      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'error');
      return {
        taskId: task.id,
        agentId: this.agent.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      };
    }
  }
}

/**
 * Decision Maker processor - makes decisions based on analysis
 */
export class DecisionMakerProcessor extends NinjaAgentProcessor {
  async process(task: AgentTask): Promise<AgentResult> {
    NinjaAgentFactory.updateAgentStatus(this.agent.name, 'working');
    
    try {
      // Decision maker logic: evaluate options and decide
      const result = {
        taskId: task.id,
        agentId: this.agent.name,
        success: true,
        output: {
          decision: 'pending',
          confidence: 0,
          reasoning: [],
        },
        completedAt: new Date(),
      };

      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'idle');
      return result;
    } catch (error) {
      NinjaAgentFactory.updateAgentStatus(this.agent.name, 'error');
      return {
        taskId: task.id,
        agentId: this.agent.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      };
    }
  }
}

// ============================================================================
// PROCESSOR FACTORY
// ============================================================================

export function createProcessorForRole(agent: NinjaAgent): NinjaAgentProcessor | null {
  switch (agent.role) {
    case NINJA_ROLES.ORCHESTRATOR:
      return new OrchestratorProcessor(agent);
    case NINJA_ROLES.ANALYZER:
      return new AnalyzerProcessor(agent);
    case NINJA_ROLES.DECISION_MAKER:
      return new DecisionMakerProcessor(agent);
    default:
      return null;
  }
}