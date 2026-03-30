# Command Center — Complete Deployment & Operations Guide

**Your unified control center for the entire No-Gas-Labs ecosystem**

## Overview

The Command Center is a real-time dashboard that gives you complete visibility and control over all systems:

- **AGP Podcast** — Start/stop broadcasts, monitor segments and FPS
- **THE ARENA** — View consensus levels, model responses, trigger analysis
- **Ninja Agents** — Monitor active agents, decisions, confidence levels
- **DeFi Execution** — Track trades, profits, fees, execution history

All systems are controlled from a single interface with real-time updates via WebSocket.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│           Command Center Dashboard (React)               │
│  - Real-time status display                              │
│  - Control buttons for each system                        │
│  - Live execution log                                    │
│  - System selector                                       │
└────────────────────┬─────────────────────────────────────┘
                     │ WebSocket
                     ↓
┌──────────────────────────────────────────────────────────┐
│       Command Center API (Node.js + Socket.IO)           │
│  - Status endpoints                                      │
│  - Control endpoints                                     │
│  - History endpoints                                     │
│  - WebSocket server                                      │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬────────────┐
        ↓            ↓            ↓            ↓
    ┌──────┐    ┌────────┐   ┌──────┐    ┌──────┐
    │ AGP  │    │ ARENA  │   │Ninja │    │ DeFi │
    └──────┘    └────────┘   └──────┘    └──────┘
```

## Files

**Frontend Component:**
- `CommandCenter.tsx` — React dashboard with real-time status and controls

**Backend API:**
- `command-center-api.ts` — Express API with Socket.IO integration

**Integration:**
- `COMMAND_CENTER_GUIDE.md` — This file

## Installation

### Step 1: Copy Files to Project

```bash
# Copy React component
cp CommandCenter.tsx src/components/

# Copy backend API
cp command-center-api.ts src/api/
```

### Step 2: Install Dependencies

```bash
npm install socket.io socket.io-client express
```

### Step 3: Initialize Command Center

In your main application file:

```typescript
import { CommandCenterAPI } from './api/command-center-api';

// Initialize Command Center API
const commandCenter = new CommandCenterAPI(3001);

// Export for use in other modules
export { commandCenter };
```

### Step 4: Add React Component to App

```typescript
import { CommandCenter } from './components/CommandCenter';

function App() {
  return (
    <div>
      <CommandCenter />
    </div>
  );
}

export default App;
```

## API Endpoints

### Status Endpoints

**Get all system status:**
```
GET /api/status
```

**Response:**
```json
{
  "agp": {
    "status": "broadcasting",
    "uptime": 125000,
    "segments": 42,
    "fps": 30
  },
  "arena": {
    "status": "processing",
    "lastResponse": "...",
    "consensus": 0.92,
    "modelsOnline": 4
  },
  "ninja": {
    "status": "orchestrating",
    "activeAgents": 3,
    "decisions": 5,
    "confidence": 0.85
  },
  "defi": {
    "status": "executing",
    "lastExecution": "arbitrage",
    "totalProfit": 45954,
    "totalFees": 23
  }
}
```

**Get specific system status:**
```
GET /api/status/:system
```

Example: `GET /api/status/agp`

### Control Endpoints

**Start AGP broadcast:**
```
POST /api/control/agp/start
```

**Stop AGP broadcast:**
```
POST /api/control/agp/stop
```

**Trigger ARENA analysis:**
```
POST /api/control/arena/analyze
```

**Execute Ninja decision:**
```
POST /api/control/ninja/execute
```

**Execute DeFi trade:**
```
POST /api/control/defi/trade
```

**Emergency stop (all systems):**
```
POST /api/control/emergency-stop
```

### History & Statistics

**Get execution history:**
```
GET /api/history?limit=100
```

**Get execution statistics:**
```
GET /api/stats
```

**Response:**
```json
{
  "totalExecutions": 156,
  "successfulExecutions": 149,
  "failedExecutions": 7,
  "totalProfit": 125430,
  "totalFees": 562
}
```

## WebSocket Events

### Client → Server

**Subscribe to system updates:**
```typescript
socket.emit('command:subscribe', {
  systems: ['agp', 'arena', 'ninja', 'defi']
});
```

**Control commands:**
```typescript
socket.emit('agp:start-broadcast');
socket.emit('agp:stop-broadcast');
socket.emit('arena:analyze');
socket.emit('ninja:execute-decision');
socket.emit('defi:execute-trade');
```

### Server → Client

**Status updates:**
```typescript
socket.on('status:update', (data) => {
  // data = { agp: {...}, arena: {...}, ... }
});
```

**Execution logs:**
```typescript
socket.on('execution:log', (log) => {
  // log = { id, timestamp, system, action, status, details }
});
```

**System alerts:**
```typescript
socket.on('system:alert', (alert) => {
  // alert = { level: 'info'|'warning'|'error', message, timestamp }
});
```

## Integration with Existing Systems

### Update AGP Status

```typescript
import { commandCenter } from './api/command-center-api';

// When AGP status changes
agpSystem.on('status-change', (status) => {
  commandCenter.updateSystemStatus('agp', {
    status: status.state,
    uptime: status.uptime,
    segments: status.segmentCount,
    fps: status.fps,
  });
});
```

### Update ARENA Status

```typescript
// When ARENA processes a response
arenaSystem.on('response', (response) => {
  commandCenter.updateSystemStatus('arena', {
    status: 'processing',
    lastResponse: response.synthesis.substring(0, 50),
    consensus: response.consensus.agreement,
    modelsOnline: response.traces.length,
  });
});
```

### Update Ninja Status

```typescript
// When Ninja makes a decision
ninjaSystem.on('decision', (decision) => {
  commandCenter.updateSystemStatus('ninja', {
    status: 'executing',
    activeAgents: decision.executionPlan.steps.length,
    decisions: decision.id,
    confidence: decision.confidence,
  });
});
```

### Update DeFi Status

```typescript
// When DeFi executes a trade
defiSystem.on('execution', (execution) => {
  commandCenter.updateSystemStatus('defi', {
    status: execution.status,
    lastExecution: execution.strategy,
    totalProfit: execution.result.profit,
    totalFees: execution.result.fee,
  });

  // Record execution result
  commandCenter.recordExecution({
    system: 'DeFi',
    action: `${execution.strategy} Trade`,
    status: execution.status,
    profit: execution.result.profit,
    fee: execution.result.fee,
  });
});
```

## Dashboard Features

### System Cards

Each system has a dedicated card showing:
- **Status indicator** — Color-coded (green = active, red = error, gray = idle)
- **Key metrics** — Uptime, segments, consensus, profit, etc.
- **Control buttons** — Start/stop, analyze, execute, trade

### Execution Log

Real-time log of all system actions with:
- **Timestamp** — When the action occurred
- **System** — Which system performed the action
- **Action** — What was done
- **Status** — Success, pending, or failed

### System Selector

Quick navigation between systems:
- **AGP** — Podcast control
- **ARENA** — Analysis control
- **Ninja** — Agent orchestration
- **DeFi** — Trade execution

## Usage Examples

### Example 1: Start a Broadcast

```typescript
// Click "START" button on AGP card
// Or via API:
fetch('/api/control/agp/start', { method: 'POST' });
```

**What happens:**
1. Command Center sends `agp:start-broadcast` via WebSocket
2. AGP system initializes video capture
3. Status updates to "broadcasting" in real-time
4. Execution log shows "AGP Start Broadcast PENDING"

### Example 2: Trigger Analysis

```typescript
// Click "ANALYZE" button on ARENA card
// Or via API:
fetch('/api/control/arena/analyze', { method: 'POST' });
```

**What happens:**
1. Command Center sends `arena:analyze` via WebSocket
2. ARENA system sends transcript to quad-exposure
3. Consensus level updates in real-time
4. Execution log shows "ARENA Trigger Analysis PENDING"

### Example 3: Execute Trade

```typescript
// Click "TRADE" button on DeFi card
// Or via API:
fetch('/api/control/defi/trade', { method: 'POST' });
```

**What happens:**
1. Command Center sends `defi:execute-trade` via WebSocket
2. DeFi system validates decision and executes flash loan
3. Profit/fee updates in real-time
4. Execution log shows "DeFi Execute Trade SUCCESS" with profit

### Example 4: Emergency Stop

```typescript
// Click emergency stop (if implemented)
// Or via API:
fetch('/api/control/emergency-stop', { method: 'POST' });
```

**What happens:**
1. All systems receive emergency stop signal
2. All active operations halt immediately
3. Status updates to "idle" for all systems
4. Execution log shows "SYSTEM Emergency Stop SUCCESS"

## Monitoring & Alerts

### Real-Time Metrics

The dashboard continuously displays:
- **AGP:** Uptime, segment count, FPS
- **ARENA:** Consensus level, models online
- **Ninja:** Active agents, decision count, confidence
- **DeFi:** Total profit, total fees, execution status

### Alerts

System alerts are displayed in real-time:
- **Info** — System status changes
- **Warning** — Low confidence decisions, high latency
- **Error** — Failed executions, API errors

## Performance

| Component | Latency | Update Frequency |
|-----------|---------|-----------------|
| **Status Display** | <100ms | Real-time |
| **Control Commands** | <50ms | Immediate |
| **Execution Log** | <100ms | Real-time |
| **WebSocket Updates** | <100ms | 1-2 per second |

## Deployment

### Local Development

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
npm start
```

**Access:** http://localhost:3000

### Production Deployment

**Option 1: Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
```

**Option 2: Vercel**
```bash
vercel deploy
```

**Option 3: Railway/Render**
- Connect GitHub repository
- Set environment variables
- Deploy

## Environment Variables

```bash
REACT_APP_API_URL=http://localhost:3001
NODE_ENV=production
PORT=3001
```

## Troubleshooting

**Dashboard not connecting:**
- Check API URL in `REACT_APP_API_URL`
- Verify backend is running on port 3001
- Check browser console for errors

**Status not updating:**
- Verify WebSocket connection in browser DevTools
- Check that systems are emitting status updates
- Verify `commandCenter.updateSystemStatus()` is being called

**Commands not working:**
- Verify backend API endpoints are correct
- Check that systems are listening for WebSocket events
- Check browser console for errors

## Next Steps

1. **Deploy to production** — Set up infrastructure
2. **Add authentication** — Secure dashboard access
3. **Add advanced controls** — Parameter tuning, strategy selection
4. **Add analytics** — Charts, trends, performance metrics
5. **Add notifications** — Email/SMS alerts for critical events

---

**You now have complete control over the entire No-Gas-Labs ecosystem from a single dashboard.**
