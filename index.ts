/**
 * THE ARENA API - Enhanced Backend with Awareness Trace
 * No Gas Labs™ | No_Death.feather™ Protocol
 * 
 * Features: AI model integrations, awareness trace, adaptive identity
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, transports } from 'winston';

// Import Arena modules
import awarenessTrace, { traceMiddleware } from './awareness_trace.js';
import { orchestrator, createProvider } from './ai_providers.js';

// Load environment variables
config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = '2.0.0-arena';

// Initialize AI providers
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY || '';
const CHATGPT_KEY = process.env.OPENAI_API_KEY || '';
const GROK_KEY = process.env.XAI_API_KEY || '';

// Register providers
if (GEMINI_KEY) orchestrator.registerProvider('gemini', createProvider('gemini', GEMINI_KEY));
if (CLAUDE_KEY) orchestrator.registerProvider('claude', createProvider('claude', CLAUDE_KEY));
if (CHATGPT_KEY) orchestrator.registerProvider('chatgpt', createProvider('chatgpt', CHATGPT_KEY));
if (GROK_KEY) orchestrator.registerProvider('grok', createProvider('grok', GROK_KEY));

// ============================================================================
// LOGGING
// ============================================================================

const logger = createLogger({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'the-arena-api' },
  transports: [new transports.Console()]
});

// ============================================================================
// EXPRESS APP
// ============================================================================

const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(traceMiddleware);
app.use(morgan('dev'));

// ============================================================================
// ROUTES
// ============================================================================

// Health
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: API_VERSION,
    uptime: process.uptime(),
    providers: {
      gemini: !!GEMINI_KEY,
      claude: !!CLAUDE_KEY,
      chatgpt: !!CHATGPT_KEY,
      grok: !!GROK_KEY,
    }
  });
});

// API Root
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    name: 'THE ARENA API',
    version: API_VERSION,
    description: 'Unified cognitive operating system with awareness trace',
    endpoints: {
      sessions: 'POST /api/sessions',
      insights: 'GET /api/insights/:sessionId',
      awareness: 'GET /api/awareness/:sessionId',
      mutations: 'GET /api/mutations/:sessionId',
    }
  });
});

// ============================================================================
// SESSIONS - Create and manage quad-exposure AI sessions
// ============================================================================

interface SessionRequest {
  prompt: string;
  models?: string[];
  systemPrompt?: string;
}

app.post('/api/sessions', async (req: Request, res: Response) => {
  const { prompt, models } = req.body as SessionRequest;
  const sessionId = req.headers['x-session-id'] as string || uuidv4();

  if (!prompt) {
    return res.status(400).json({
      error: 'Missing required field: prompt',
      availableModels: ['gemini', 'grok', 'claude', 'chatgpt']
    });
  }

  try {
    // Orchestrate AI responses
    const responses = await orchestrator.orchestrate(sessionId, prompt, models);

    // Get current awareness state
    const awareness = awarenessTrace.getInsights(sessionId);

    res.status(201).json({
      sessionId,
      status: 'created',
      prompt,
      responses: responses.map((r: { modelName: string; output: string; inputTokens: number; outputTokens: number; latencyMs: number }) => ({
        model: r.modelName,
        output: r.output,
        tokens: r.inputTokens + r.outputTokens,
        latencyMs: r.latencyMs,
      })),
      awareness: {
        traceCount: awareness.traceCount,
        uniqueAgents: awareness.uniqueAgents,
        avgTension: awareness.avgTension.toFixed(3),
      },
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Session error:', error);
    res.status(500).json({
      error: 'Failed to process session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ============================================================================
// INSIGHTS - Get synthesized insights for a session
// ============================================================================

app.get('/api/insights/:sessionId', (req: Request, res: Response) => {
  const insights = awarenessTrace.getInsights(req.params.sessionId);

  res.json({
    sessionId: req.params.sessionId,
    ...insights,
    message: insights.traceCount > 0 
      ? 'Awareness trace active' 
      : 'No traces found for this session'
  });
});

// ============================================================================
// AWARENESS - Get full awareness trace for a session
// ============================================================================

app.get('/api/awareness/:sessionId', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const limit = parseInt(req.query.limit as string) || 20;
  
  const history = awarenessTrace.getHistoryContext(sessionId, limit);
  const session = awarenessTrace.getSession(sessionId);

  res.json({
    sessionId,
    session: session ? {
      createdAt: session.createdAt,
      lastActiveAt: session.lastActiveAt,
      traceCount: session.traceCount,
      totalTension: session.totalTension,
      activeAgents: session.activeAgents,
    } : null,
    traces: history.map(t => ({
      id: t.id,
      timestamp: t.timestamp,
      agent: t.agentId,
      model: t.modelName,
      outputPreview: t.output.substring(0, 200) + '...',
      tension: t.tensionScore.toFixed(3),
    })),
    fieldState: {
      currentTension: awarenessTrace.calculateTension(sessionId).toFixed(3),
      isAdapting: (session?.agentMutations.length || 0) > 0,
    }
  });
});

// ============================================================================
// MUTATIONS - Get adaptive identity mutations for a session
// ============================================================================

app.get('/api/mutations/:sessionId', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const mutations = awarenessTrace.getMutations(sessionId);

  res.json({
    sessionId,
    mutationCount: mutations.length,
    mutations: mutations.map(m => ({
      agentId: m.agentId,
      originalRole: m.originalRole,
      mutatedRole: m.mutatedRole,
      reason: m.mutationReason,
      traceCount: m.traceCount,
      timestamp: m.timestamp,
    })),
    message: mutations.length > 0 
      ? 'Agents have adapted to field tension' 
      : 'No mutations detected - field is stable'
  });
});

// ============================================================================
// PUBLISH - Publish insights to external channels
// ============================================================================

app.post('/api/publish', (req: Request, res: Response) => {
  const { channel, content } = req.body;

  if (!channel || !content) {
    return res.status(400).json({
      error: 'Missing required fields: channel, content',
      supportedChannels: ['twitter', 'substack', 'email']
    });
  }

  // Placeholder for publishing logic
  res.status(501).json({
    message: 'Publishing endpoint - Implementation pending',
    requestedChannel: channel,
    status: 'not_implemented'
  });
});

// ============================================================================
// BLOCKCHAIN - Claim seniority on-chain
// ============================================================================

app.post('/api/blockchain/claim', (req: Request, res: Response) => {
  const { network, insightHash } = req.body;

  if (!network || !insightHash) {
    return res.status(400).json({
      error: 'Missing required fields: network, insightHash',
      supportedNetworks: ['solana', 'base']
    });
  }

  res.status(501).json({
    message: 'Blockchain claiming - Implementation pending',
    requestedNetwork: network,
    status: 'not_implemented'
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'production' ? 'An error occurred' : err.message,
  });
});

// ============================================================================
// START
// ============================================================================

const server = app.listen(PORT, () => {
  logger.info(`THE ARENA API v${API_VERSION} started on port ${PORT}`);
  logger.info(`Active providers: ${[
    GEMINI_KEY && 'gemini',
    CLAUDE_KEY && 'claude', 
    CHATGPT_KEY && 'chatgpt',
    GROK_KEY && 'grok'
  ].filter(Boolean).join(', ') || 'none (add API keys)'}`);
});

export default server;