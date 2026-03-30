/**
 * COMMAND CENTER — Unified Control Dashboard
 * Real-time visibility and control over AGP, ARENA, Ninja, DeFi systems
 */

import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

interface SystemStatus {
  agp: {
    status: 'idle' | 'recording' | 'broadcasting';
    uptime: number;
    segments: number;
    fps: number;
  };
  arena: {
    status: 'ready' | 'processing' | 'error';
    lastResponse: string;
    consensus: number;
    modelsOnline: number;
  };
  ninja: {
    status: 'idle' | 'orchestrating' | 'executing';
    activeAgents: number;
    decisions: number;
    confidence: number;
  };
  defi: {
    status: 'idle' | 'executing' | 'completed';
    lastExecution: string;
    totalProfit: number;
    totalFees: number;
  };
}

interface ExecutionLog {
  id: string;
  timestamp: number;
  system: string;
  action: string;
  status: 'success' | 'pending' | 'failed';
  details: string;
}

export const CommandCenter: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    agp: { status: 'idle', uptime: 0, segments: 0, fps: 0 },
    arena: { status: 'ready', lastResponse: '', consensus: 0, modelsOnline: 4 },
    ninja: { status: 'idle', activeAgents: 0, decisions: 0, confidence: 0 },
    defi: { status: 'idle', lastExecution: '', totalProfit: 0, totalFees: 0 },
  });

  const [executionLog, setExecutionLog] = useState<ExecutionLog[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState<'agp' | 'arena' | 'ninja' | 'defi'>('agp');

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on('status:update', (data: Partial<SystemStatus>) => {
      setSystemStatus((prev) => ({ ...prev, ...data }));
    });

    newSocket.on('execution:log', (log: ExecutionLog) => {
      setExecutionLog((prev) => [log, ...prev].slice(0, 100)); // Keep last 100
    });

    newSocket.on('connect', () => {
      console.log('Command Center connected');
      newSocket.emit('command:subscribe', { systems: ['agp', 'arena', 'ninja', 'defi'] });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Control functions
  const startBroadcast = useCallback(async () => {
    if (socket) {
      socket.emit('agp:start-broadcast');
      addLog('AGP', 'Start Broadcast', 'pending', 'Initializing video capture...');
    }
  }, [socket]);

  const stopBroadcast = useCallback(async () => {
    if (socket) {
      socket.emit('agp:stop-broadcast');
      addLog('AGP', 'Stop Broadcast', 'pending', 'Finalizing recording...');
    }
  }, [socket]);

  const triggerArenaAnalysis = useCallback(async () => {
    if (socket) {
      socket.emit('arena:analyze');
      addLog('ARENA', 'Trigger Analysis', 'pending', 'Sending to quad-exposure...');
    }
  }, [socket]);

  const executeDecision = useCallback(async () => {
    if (socket) {
      socket.emit('ninja:execute-decision');
      addLog('Ninja', 'Execute Decision', 'pending', 'Orchestrating agents...');
    }
  }, [socket]);

  const executeTrade = useCallback(async () => {
    if (socket) {
      socket.emit('defi:execute-trade');
      addLog('DeFi', 'Execute Trade', 'pending', 'Requesting flash loan...');
    }
  }, [socket]);

  const addLog = (system: string, action: string, status: 'success' | 'pending' | 'failed', details: string) => {
    const log: ExecutionLog = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      system,
      action,
      status,
      details,
    };
    setExecutionLog((prev) => [log, ...prev].slice(0, 100));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return '#888';
      case 'ready':
        return '#888';
      case 'recording':
      case 'broadcasting':
      case 'processing':
      case 'orchestrating':
      case 'executing':
        return '#00ff00';
      case 'completed':
        return '#00ff00';
      case 'error':
        return '#ff0000';
      default:
        return '#888';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1>🎮 NO-GAS-LABS COMMAND CENTER</h1>
        <div style={styles.timestamp}>{new Date().toLocaleTimeString()}</div>
      </div>

      {/* System Status Grid */}
      <div style={styles.statusGrid}>
        {/* AGP System */}
        <div style={styles.systemCard}>
          <div style={styles.systemTitle}>
            🎙️ AGP PODCAST
            <span style={{ ...styles.statusDot, backgroundColor: getStatusColor(systemStatus.agp.status) }} />
          </div>
          <div style={styles.statusLine}>Status: {systemStatus.agp.status.toUpperCase()}</div>
          <div style={styles.statusLine}>Uptime: {(systemStatus.agp.uptime / 1000).toFixed(1)}s</div>
          <div style={styles.statusLine}>Segments: {systemStatus.agp.segments}</div>
          <div style={styles.statusLine}>FPS: {systemStatus.agp.fps}</div>
          <div style={styles.controlButtons}>
            <button style={styles.button} onClick={startBroadcast}>
              ▶ START
            </button>
            <button style={{ ...styles.button, backgroundColor: '#cc0000' }} onClick={stopBroadcast}>
              ⏹ STOP
            </button>
          </div>
        </div>

        {/* ARENA System */}
        <div style={styles.systemCard}>
          <div style={styles.systemTitle}>
            🧠 THE ARENA
            <span style={{ ...styles.statusDot, backgroundColor: getStatusColor(systemStatus.arena.status) }} />
          </div>
          <div style={styles.statusLine}>Status: {systemStatus.arena.status.toUpperCase()}</div>
          <div style={styles.statusLine}>Consensus: {(systemStatus.arena.consensus * 100).toFixed(1)}%</div>
          <div style={styles.statusLine}>Models Online: {systemStatus.arena.modelsOnline}/4</div>
          <div style={styles.statusLine}>Last: {systemStatus.arena.lastResponse.substring(0, 30)}...</div>
          <div style={styles.controlButtons}>
            <button style={styles.button} onClick={triggerArenaAnalysis}>
              🔄 ANALYZE
            </button>
          </div>
        </div>

        {/* Ninja System */}
        <div style={styles.systemCard}>
          <div style={styles.systemTitle}>
            ⚡ NINJA AGENTS
            <span style={{ ...styles.statusDot, backgroundColor: getStatusColor(systemStatus.ninja.status) }} />
          </div>
          <div style={styles.statusLine}>Status: {systemStatus.ninja.status.toUpperCase()}</div>
          <div style={styles.statusLine}>Active Agents: {systemStatus.ninja.activeAgents}</div>
          <div style={styles.statusLine}>Decisions: {systemStatus.ninja.decisions}</div>
          <div style={styles.statusLine}>Confidence: {(systemStatus.ninja.confidence * 100).toFixed(1)}%</div>
          <div style={styles.controlButtons}>
            <button style={styles.button} onClick={executeDecision}>
              ⚙️ EXECUTE
            </button>
          </div>
        </div>

        {/* DeFi System */}
        <div style={styles.systemCard}>
          <div style={styles.systemTitle}>
            💰 DEFI EXECUTION
            <span style={{ ...styles.statusDot, backgroundColor: getStatusColor(systemStatus.defi.status) }} />
          </div>
          <div style={styles.statusLine}>Status: {systemStatus.defi.status.toUpperCase()}</div>
          <div style={styles.statusLine}>Total Profit: ${systemStatus.defi.totalProfit.toLocaleString()}</div>
          <div style={styles.statusLine}>Total Fees: ${systemStatus.defi.totalFees.toLocaleString()}</div>
          <div style={styles.statusLine}>Last: {systemStatus.defi.lastExecution}</div>
          <div style={styles.controlButtons}>
            <button style={styles.button} onClick={executeTrade}>
              💸 TRADE
            </button>
          </div>
        </div>
      </div>

      {/* Execution Log */}
      <div style={styles.logContainer}>
        <div style={styles.logTitle}>📋 EXECUTION LOG</div>
        <div style={styles.logContent}>
          {executionLog.map((log) => (
            <div key={log.id} style={styles.logEntry}>
              <span style={{ color: '#00ff00', minWidth: '100px' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span style={{ color: '#ffff00', minWidth: '80px' }}>[{log.system}]</span>
              <span style={{ color: '#00ccff' }}>{log.action}</span>
              <span
                style={{
                  color: log.status === 'success' ? '#00ff00' : log.status === 'failed' ? '#ff0000' : '#ffff00',
                  marginLeft: 'auto',
                }}
              >
                {log.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Selector */}
      <div style={styles.systemSelector}>
        {(['agp', 'arena', 'ninja', 'defi'] as const).map((sys) => (
          <button
            key={sys}
            style={{
              ...styles.selectorButton,
              backgroundColor: selectedSystem === sys ? '#00ff00' : '#333',
              color: selectedSystem === sys ? '#000' : '#00ff00',
            }}
            onClick={() => setSelectedSystem(sys)}
          >
            {sys.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0a0e27',
    color: '#00ff00',
    fontFamily: 'Courier New, monospace',
    padding: '20px',
    minHeight: '100vh',
    border: '2px solid #00ff00',
  } as React.CSSProperties,

  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
    borderBottom: '2px solid #00ff00',
    paddingBottom: '20px',
  } as React.CSSProperties,

  timestamp: {
    fontSize: '12px',
    color: '#888',
    marginTop: '10px',
  } as React.CSSProperties,

  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  } as React.CSSProperties,

  systemCard: {
    border: '2px solid #00ff00',
    padding: '20px',
    backgroundColor: '#0f1535',
  } as React.CSSProperties,

  systemTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  } as React.CSSProperties,

  statusLine: {
    fontSize: '12px',
    marginBottom: '8px',
    color: '#00ccff',
  } as React.CSSProperties,

  controlButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  } as React.CSSProperties,

  button: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#00ff00',
    color: '#000',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '12px',
  } as React.CSSProperties,

  logContainer: {
    border: '2px solid #00ff00',
    padding: '20px',
    backgroundColor: '#0f1535',
    marginBottom: '20px',
    maxHeight: '300px',
    overflow: 'auto',
  } as React.CSSProperties,

  logTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderBottom: '1px solid #00ff00',
    paddingBottom: '10px',
  } as React.CSSProperties,

  logContent: {
    fontSize: '11px',
  } as React.CSSProperties,

  logEntry: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
    padding: '5px',
    borderLeft: '2px solid #00ff00',
    paddingLeft: '10px',
  } as React.CSSProperties,

  systemSelector: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  } as React.CSSProperties,

  selectorButton: {
    padding: '10px 20px',
    border: '2px solid #00ff00',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  } as React.CSSProperties,
};
