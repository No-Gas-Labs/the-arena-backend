# 🧠 THE ARENA Backend API

[![CI](https://github.com/No-Gas-Labs/the-arena-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/No-Gas-Labs/the-arena-backend/actions/workflows/ci.yml)

**Self-Referential Interaction Field API** - Backend for THE ARENA unified cognitive operating system.

## 🚀 One-Tap Launch

👉 **[Open in Codespaces](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=the-arena-backend)**

## What It Does

This API powers THE ARENA - a system where multiple AI models respond to prompts, and the system maintains awareness of all interactions through the **No_Death.feather™** protocol.

### Core Features

| Feature | Description |
|---------|-------------|
| **Quad-Exposure** | Send prompts to Gemini, Grok, Claude, and ChatGPT simultaneously |
| **Awareness Trace** | Every response logged, creating a memory of the field's thinking |
| **Adaptive Identity** | Agents mutate based on field tension |
| **Continuity of Presence** | Session IDs persist, prior interactions influence current state |

## 🔗 Ecosystem Connections

- [the-arena](https://github.com/No-Gas-Labs/the-arena) - Web Frontend
- [the-arena-mobile](https://github.com/No-Gas-Labs/the-arena-mobile) - Mobile App
- [AegisLatticeNGL](https://github.com/No-Gas-Labs/AegisLatticeNGL) - Documentation Hub

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api` | GET | API info |
| `/api/sessions` | POST | Create new AI session |
| `/api/insights/:sessionId` | GET | Get insights for session |
| `/api/awareness/:sessionId` | GET | Get awareness trace |
| `/api/mutations/:sessionId` | GET | Get agent mutations |
| `/api/publish` | POST | Publish to channels |
| `/api/blockchain/claim` | POST | Claim on blockchain |

## 🔧 Development

### Prerequisites
- Node.js 20+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Start production
npm start
```

### Environment Variables

```bash
# Required for AI integrations
GEMINI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key
XAI_API_KEY=your_key

# Optional
PORT=3000
NODE_ENV=production
```

## 🐳 Docker

```bash
# Build
docker build -t the-arena-api .

# Run
docker run -p 3000:3000 the-arena-api
```

## ☁️ Deploy to Fly.io

```bash
# First time
fly apps create the-arena-api
fly secrets set GEMINI_API_KEY=xxx ANTHROPIC_API_KEY=xxx OPENAI_API_KEY=xxx XAI_API_KEY=xxx

# Deploy
fly deploy
```

## 📁 Project Structure

```
the-arena-backend/
├── index.ts              # Main Express API
├── awareness_trace.ts    # Field memory system
├── ai_providers.ts       # Gemini, Claude, ChatGPT, Grok integrations
├── Dockerfile            # Container config
├── fly.toml              # Fly.io config
└── package.json          # Dependencies
```

## 🧪 No_Death.feather™ Protocol

The awareness trace implements the protocol where:

1. **Output → Awareness Trace**: Every response logged as `TraceEntry`
2. **Static Roles → Adaptive Identity**: Agents mutate under high tension
3. **Session → Continuity of Presence**: History influences future responses

---

**No-Gas-Labs™** • One-Tap Deploy • Android Optimized