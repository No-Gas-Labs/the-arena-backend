/**
 * THE ARENA API - Backend for the unified cognitive operating system
 * No Gas Labs™ | Node-H: Damien Featherstone
 * 
 * This is the production entry point for THE ARENA backend.
 * Features: Health checks, CORS, logging, error handling, extensible routing
 */

import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, transports } from 'winston';

// Load environment variables
config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = '1.0.0';
const CORS_ORIGINS = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:3001', 'https://the-arena.vercel.app'];

// ============================================================================
// LOGGING SETUP
// ============================================================================

const logger = createLogger({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'the-arena-api' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
      )
    })
  ]
});

// ============================================================================
// EXPRESS APP INITIALIZATION
// ============================================================================

const app = express();

// Trust proxy for Fly.io and reverse proxies
app.set('trust proxy', true);

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production',
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (CORS_ORIGINS.includes(origin) || CORS_ORIGINS.includes('*')) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked request from: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-Session-ID'],
  exposedHeaders: ['X-Request-ID']
}));

// Request ID middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
});

// HTTP request logging
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// ROUTES
// ============================================================================

// --- Health Check Route ---
const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: API_VERSION,
    environment: NODE_ENV,
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };
  
  res.status(200).json(healthData);
});

healthRouter.get('/ready', (_req: Request, res: Response) => {
  // Readiness probe - check critical dependencies here
  res.status(200).json({ ready: true, timestamp: new Date().toISOString() });
});

healthRouter.get('/live', (_req: Request, res: Response) => {
  // Liveness probe
  res.status(200).json({ alive: true, timestamp: new Date().toISOString() });
});

app.use('/health', healthRouter);

// --- API Routes ---
const apiRouter = Router();

// API Root - Service Info
apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'THE ARENA API',
    version: API_VERSION,
    description: 'Backend for the unified cognitive operating system',
    documentation: '/api/docs',
    endpoints: {
      health: '/health',
      sessions: '/api/sessions',
      insights: '/api/insights',
      publish: '/api/publish',
      blockchain: '/api/blockchain'
    }
  });
});

// Sessions endpoint placeholder (ready for implementation)
apiRouter.get('/sessions', (_req: Request, res: Response) => {
  res.json({
    message: 'Sessions endpoint - Ready for implementation',
    description: 'Manage quad-exposure AI sessions',
    status: 'placeholder'
  });
});

apiRouter.post('/sessions', (req: Request, res: Response) => {
  const { models, prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ 
      error: 'Missing required field: prompt',
      availableModels: ['gemini', 'grok', 'claude', 'chatgpt']
    });
  }
  
  // Placeholder response - actual AI integration to be implemented
  res.status(201).json({
    sessionId: uuidv4(),
    status: 'created',
    models: models || ['gemini', 'grok', 'claude', 'chatgpt'],
    prompt: prompt,
    message: 'Session created. AI model integration pending.',
    createdAt: new Date().toISOString()
  });
});

// Insights endpoint placeholder
apiRouter.get('/insights', (_req: Request, res: Response) => {
  res.json({
    message: 'Insights endpoint - Ready for implementation',
    description: 'Retrieve and manage synthesized insights',
    status: 'placeholder'
  });
});

// Publish endpoint placeholder
apiRouter.post('/publish', (req: Request, res: Response) => {
  const { channel, content } = req.body;
  
  if (!channel || !content) {
    return res.status(400).json({ 
      error: 'Missing required fields: channel, content',
      supportedChannels: ['twitter', 'substack', 'email']
    });
  }
  
  res.status(501).json({
    message: 'Publishing endpoint - Not yet implemented',
    requestedChannel: channel,
    status: 'not_implemented'
  });
});

// Blockchain endpoint placeholder
apiRouter.get('/blockchain', (_req: Request, res: Response) => {
  res.json({
    message: 'Blockchain endpoint - Ready for implementation',
    description: 'Immutable seniority claiming on Solana/Base',
    supportedNetworks: ['solana', 'base'],
    status: 'placeholder'
  });
});

apiRouter.post('/blockchain/claim', (req: Request, res: Response) => {
  const { network, insightHash } = req.body;
  
  if (!network || !insightHash) {
    return res.status(400).json({ 
      error: 'Missing required fields: network, insightHash',
      supportedNetworks: ['solana', 'base']
    });
  }
  
  res.status(501).json({
    message: 'Blockchain claiming - Not yet implemented',
    requestedNetwork: network,
    insightHash: insightHash,
    status: 'not_implemented'
  });
});

// Mount API routes
app.use('/api', apiRouter);

// --- Root Route ---
app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'THE ARENA API',
    version: API_VERSION,
    status: 'operational',
    health: '/health',
    api: '/api'
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id']
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.headers['x-request-id']
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id']
  });
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  // Add cleanup logic here (close DB connections, etc.)
  
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ============================================================================
// START SERVER
// ============================================================================

const server = app.listen(PORT, () => {
  logger.info(`THE ARENA API started`, {
    port: PORT,
    environment: NODE_ENV,
    version: API_VERSION,
    nodeVersion: process.version
  });
  
  // Log available routes
  logger.info('Available routes:', {
    health: `GET /health`,
    healthReady: `GET /health/ready`,
    healthLive: `GET /health/live`,
    apiRoot: `GET /api`,
    sessions: `GET/POST /api/sessions`,
    insights: `GET /api/insights`,
    publish: `POST /api/publish`,
    blockchain: `GET /api/blockchain`,
    blockchainClaim: `POST /api/blockchain/claim`
  });
});

export default server;