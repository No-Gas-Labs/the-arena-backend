/**
 * COMMAND CENTER API
 * Backend endpoints for unified system control and monitoring
 */

import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

export class CommandCenterAPI {
  private app: express.Application;
  private io: SocketIOServer;
  private systemState: any = {};
  private executionHistory: any[] = [];

  constructor(port: number = 3001) {
    this.app = express();
    const httpServer = createServer(this.app);
    this.io = new SocketIOServer(httpServer, {
      cors: { origin: '*' },
    });

    this.setupRoutes();
    this.setupWebSocket();

    httpServer.listen(port, () => {
      console.log(`Command Center API listening on port ${port}`);
    });
  }

  private setupRoutes() {
    this.app.use(express.json());

    // Get all system status
    this.app.get('/api/status', (req, res) => {
      res.json(this.systemState);
    });

    // Get specific system status
    this.app.get('/api/status/:system', (req, res) => {
      const { system } = req.params;
      res.json(this.systemState[system] || {});
    });

    // Get execution history
    this.app.get('/api/history', (req, res) => {
      const limit = parseInt(req.query.limit as string) || 100;
      res.json(this.executionHistory.slice(0, limit));
    });

    // Get execution statistics
    this.app.get('/api/stats', (req, res) => {
      const stats = {
        totalExecutions: this.executionHistory.length,
        successfulExecutions: this.executionHistory.filter((e) => e.status === 'success').length,
        failedExecutions: this.executionHistory.filter((e) => e.status === 'failed').length,
        totalProfit: this.executionHistory.reduce((sum, e) => sum + (e.profit || 0), 0),
        totalFees: this.executionHistory.reduce((sum, e) => sum + (e.fee || 0), 0),
      };
      res.json(stats);
    });

    // Control endpoints
    this.app.post('/api/control/agp/start', (req, res) => {
      this.io.emit('agp:start-broadcast');
      this.addLog('AGP', 'Start Broadcast', 'pending');
      res.json({ success: true });
    });

    this.app.post('/api/control/agp/stop', (req, res) => {
      this.io.emit('agp:stop-broadcast');
      this.addLog('AGP', 'Stop Broadcast', 'pending');
      res.json({ success: true });
    });

    this.app.post('/api/control/arena/analyze', (req, res) => {
      this.io.emit('arena:analyze');
      this.addLog('ARENA', 'Trigger Analysis', 'pending');
      res.json({ success: true });
    });

    this.app.post('/api/control/ninja/execute', (req, res) => {
      this.io.emit('ninja:execute-decision');
      this.addLog('Ninja', 'Execute Decision', 'pending');
      res.json({ success: true });
    });

    this.app.post('/api/control/defi/trade', (req, res) => {
      this.io.emit('defi:execute-trade');
      this.addLog('DeFi', 'Execute Trade', 'pending');
      res.json({ success: true });
    });

    // Emergency stop
    this.app.post('/api/control/emergency-stop', (req, res) => {
      this.io.emit('system:emergency-stop');
      this.addLog('SYSTEM', 'Emergency Stop', 'success');
      res.json({ success: true });
    });
  }

  private setupWebSocket() {
    this.io.on('connection', (socket) => {
      console.log('Command Center client connected:', socket.id);

      // Subscribe to system updates
      socket.on('command:subscribe', (data) => {
        const { systems } = data;
        socket.join(`systems:${systems.join(',')}`);
        console.log(`Client subscribed to systems:`, systems);
      });

      // Relay control commands
      socket.on('agp:start-broadcast', () => {
        this.io.emit('agp:start-broadcast');
        this.addLog('AGP', 'Start Broadcast', 'pending');
      });

      socket.on('agp:stop-broadcast', () => {
        this.io.emit('agp:stop-broadcast');
        this.addLog('AGP', 'Stop Broadcast', 'pending');
      });

      socket.on('arena:analyze', () => {
        this.io.emit('arena:analyze');
        this.addLog('ARENA', 'Trigger Analysis', 'pending');
      });

      socket.on('ninja:execute-decision', () => {
        this.io.emit('ninja:execute-decision');
        this.addLog('Ninja', 'Execute Decision', 'pending');
      });

      socket.on('defi:execute-trade', () => {
        this.io.emit('defi:execute-trade');
        this.addLog('DeFi', 'Execute Trade', 'pending');
      });

      socket.on('disconnect', () => {
        console.log('Command Center client disconnected:', socket.id);
      });
    });
  }

  /**
   * Update system status (called by individual systems)
   */
  updateSystemStatus(system: string, status: any) {
    this.systemState[system] = status;
    this.io.emit('status:update', { [system]: status });
  }

  /**
   * Add execution log entry
   */
  private addLog(system: string, action: string, status: string, details: string = '') {
    const log = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      system,
      action,
      status,
      details,
    };
    this.executionHistory.unshift(log);
    if (this.executionHistory.length > 1000) {
      this.executionHistory.pop();
    }
    this.io.emit('execution:log', log);
  }

  /**
   * Record execution result
   */
  recordExecution(data: any) {
    this.executionHistory.unshift({
      id: `exec-${Date.now()}`,
      timestamp: Date.now(),
      ...data,
    });
    if (this.executionHistory.length > 1000) {
      this.executionHistory.pop();
    }
    this.io.emit('execution:log', this.executionHistory[0]);
  }

  /**
   * Broadcast system alert
   */
  broadcastAlert(level: 'info' | 'warning' | 'error', message: string) {
    this.io.emit('system:alert', { level, message, timestamp: Date.now() });
  }
}

// ============================================================
// INTEGRATION WITH EXISTING SYSTEMS
// ============================================================

/*
// In your main application file:

import { CommandCenterAPI } from './command-center-api';

const commandCenter = new CommandCenterAPI(3001);

// Update status from AGP system
app.on('agp:status', (status) => {
  commandCenter.updateSystemStatus('agp', status);
});

// Update status from ARENA system
app.on('arena:status', (status) => {
  commandCenter.updateSystemStatus('arena', status);
});

// Update status from Ninja system
app.on('ninja:status', (status) => {
  commandCenter.updateSystemStatus('ninja', status);
});

// Update status from DeFi system
app.on('defi:status', (status) => {
  commandCenter.updateSystemStatus('defi', status);
});

// Record execution results
app.on('execution:complete', (result) => {
  commandCenter.recordExecution(result);
});

// Broadcast alerts
app.on('system:alert', (alert) => {
  commandCenter.broadcastAlert(alert.level, alert.message);
});
*/
