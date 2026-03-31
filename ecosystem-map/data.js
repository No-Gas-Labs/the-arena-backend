// Ecosystem Data for No-Gas-Labs
const ecosystemData = {
    domains: [
        {
            id: "arena",
            name: "THE ARENA",
            description: "Cognitive Operating System with quad-exposure AI orchestration",
            icon: "🧠",
            colorClass: "arena",
            repositories: [
                { name: "the-arena-backend", purpose: "API backend for THE ARENA", language: "TypeScript", status: "OPERATIONAL", android: "HIGH", isPrivate: false, deployment: "Fly.io" },
                { name: "the-arena", purpose: "Frontend web application (Next.js/Vercel)", language: "TypeScript", status: "UNKNOWN", android: "MEDIUM", isPrivate: false, deployment: "Vercel" },
                { name: "the-arena-mobile", purpose: "Mobile application (Expo/React Native)", language: "TypeScript", status: "UNKNOWN", android: "HIGH", isPrivate: false, deployment: "Expo" }
            ]
        },
        {
            id: "ninja",
            name: "Ninja Agent Architecture",
            description: "Multi-agent orchestration system with specialized agents",
            icon: "🥷",
            colorClass: "ninja",
            repositories: [
                { name: "ninja-agent-runtime", purpose: "Core runtime for ninja agent execution", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-orchestrator-agent", purpose: "Central orchestration agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-executor-agent", purpose: "Task execution agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-strategist-agent", purpose: "Strategic planning agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-analyst-agent", purpose: "Analysis and insights agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-security-agent", purpose: "Security monitoring agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-monitor-agent", purpose: "System monitoring agent", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-message-bus", purpose: "Inter-agent communication bus", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-integrator-agent", purpose: "Integration bridge agent", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ninja-communicator-agent", purpose: "Communication and messaging agent", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "agp",
            name: "AGP Podcast Ecosystem",
            description: "America's Got Problems - Automated podcast production",
            icon: "🎙️",
            colorClass: "agp",
            repositories: [
                { name: "agp-methodology", purpose: "Systems-level diagnosis of Hybrid Cognition", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: false },
                { name: "VoxScriptNGL", purpose: "Scriptwriting, satire, and promo generation", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "VeritasShieldNGL", purpose: "Fact-checker and bias correction", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "SonicForgeNGL", purpose: "Audio editing, mastering, and FX", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "MaestroNGL", purpose: "Workflow orchestration agent", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "PulseMonitorNGL", purpose: "Sentiment analysis and review scanning", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "EthosGuardNGL", purpose: "Tone and brand enforcement", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "BuzzWireNGL", purpose: "Social media posts and scheduling", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "BroadcastNGL", purpose: "Multi-platform distribution", language: "Python", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "defi",
            name: "DeFi / Flash Loan Systems",
            description: "Multi-chain flash loan and arbitrage protocols",
            icon: "⛓️",
            colorClass: "defi",
            repositories: [
                { name: "sui-flash-loan-protocol", purpose: "Sui Flash Loan Protocol with atomic transactions", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, deployment: "Sui" },
                { name: "flash-loan-dapp", purpose: "Flash Loan dApp supporting EOS, TON, SUI", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "multi-chain-flash-loan-dapp", purpose: "Multi-chain flash loan with TON→EOS→SUI arbitrage", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "sui-flash-loan-dapp", purpose: "Hyper-resilient Sui Flash Loan DApp", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "sui-flash-loan-system", purpose: "Sui flash loan system implementation", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "flash-loan-arbitrage-sui", purpose: "Flash Loan Arbitrage System on Sui", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "suiflash", purpose: "SuiFlash application", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "no_gas_labs_sui_flashloan", purpose: "Sui Flash Loan dApp v1", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "def4us",
            name: "DEF4US'28 Campaign",
            description: "Political campaign automation and management",
            icon: "🗳️",
            colorClass: "def4us",
            repositories: [
                { name: "def4us28-campaign-orchestrator", purpose: "Central campaign orchestration", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-analytics-dashboard", purpose: "Campaign analytics dashboard", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-compliance-tracker", purpose: "Campaign compliance tracking", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-content-management", purpose: "Campaign content management", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-economic-binding", purpose: "Economic binding and incentive system", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-fundraising-platform", purpose: "Campaign fundraising platform", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-memetic-propagator", purpose: "Memetic content propagation", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-mobile-app", purpose: "Campaign mobile application", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-narrative-engine", purpose: "Campaign narrative generation", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-social-media-manager", purpose: "Campaign social media management", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-volunteer-coordination", purpose: "Volunteer coordination system", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "def4us28-voter-engagement", purpose: "Voter engagement system", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "ngl",
            name: "NGL Ecosystem Infrastructure",
            description: "Core platform services and infrastructure",
            icon: "🏗️",
            colorClass: "ngl",
            repositories: [
                { name: "ngl-api-gateway", purpose: "Central API gateway for NGL ecosystem", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-data-lake", purpose: "Central data storage and analytics", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-identity-service", purpose: "Identity and authentication service", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-governance-platform", purpose: "Governance and voting platform", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-marketplace", purpose: "NGL marketplace platform", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-training-center", purpose: "Training and onboarding center", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "ngl-developer-portal", purpose: "Developer portal and documentation", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "infra",
            name: "Core Infrastructure",
            description: "Supporting systems, dashboards, and utilities",
            icon: "🔧",
            colorClass: "infra",
            repositories: [
                { name: "AegisLatticeNGL", purpose: "System architecture and observability lead", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "LatticeMobileNGL", purpose: "Mobile-first zero-code voice gateway", language: "JavaScript", status: "UNKNOWN", android: "HIGH", isPrivate: true },
                { name: "damien-mobile", purpose: "DAMIEN Mobile - Tiered AI Platform", language: "TypeScript", status: "UNKNOWN", android: "HIGH", isPrivate: true },
                { name: "damien-website", purpose: "Personal website", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "no-gas-labs-profile", purpose: "No-Gas-Labs profile/landing page", language: "N/A", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "nogaslabs-site", purpose: "No-Gas-Labs website", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "no-gas-labs-monorepo", purpose: "Monorepo for No_Gas_Labs projects", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "gaming",
            name: "Gaming & Entertainment",
            description: "Play-to-earn games and entertainment applications",
            icon: "🎮",
            colorClass: "gaming",
            repositories: [
                { name: "no-gas-slaps", purpose: "No_Gas_Slaps P2E Telegram game", language: "HTML", status: "UNKNOWN", android: "HIGH", isPrivate: true, deployment: "Telegram" },
                { name: "NoGasSlaps-Frontend-v1", purpose: "NoGasSlaps frontend application", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "dia-p2e-cockpit", purpose: "DIA Play-to-Earn Cockpit dashboard", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: false },
                { name: "dia-cockpit", purpose: "DIA cockpit application", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "omnichain-faucet-townsquare", purpose: "Gasless onboarding RPG for EOS, TON, SUI", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "protocol",
            name: "Protocols & Standards",
            description: "Core protocols and coding standards",
            icon: "📜",
            colorClass: "protocol",
            repositories: [
                { name: "vibe-coding-protocol", purpose: "VIBE_CODING_PROTOCOL - Autonomous Agent System", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "vibe-coding-protocol-v2", purpose: "VIBE_CODING_PROTOCOL v2", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "Vibe-_Coding_Protocol", purpose: "Vibe_Coding_Protocol", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "featherstone-field-live-broadcast", purpose: "Featherstone Field Live Broadcast System", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "enhanced",
            name: "Enhanced System Variants",
            description: "Enhanced/duplicate system implementations",
            icon: "⚡",
            colorClass: "enhanced",
            repositories: [
                { name: "vox-script-pro", purpose: "Enhanced system - vox-script-pro", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "VoxScriptNGL" },
                { name: "veritas-shield-pro", purpose: "Enhanced system - veritas-shield-pro", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "VeritasShieldNGL" },
                { name: "ethos-guard-pro", purpose: "Enhanced system - ethos-guard-pro", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "EthosGuardNGL" },
                { name: "buzz-wire-pro", purpose: "Enhanced system - buzz-wire-pro", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "BuzzWireNGL" },
                { name: "broadcast-global", purpose: "Enhanced system - broadcast-global", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "BroadcastNGL" },
                { name: "sui-arbitrage-v2", purpose: "Enhanced system - sui-arbitrage-v2", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "sonic-forge-studio", purpose: "Enhanced system - sonic-forge-studio", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true, duplicate: "SonicForgeNGL" },
                { name: "bob-bridge-v2", purpose: "Enhanced system - bob-bridge-v2", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true }
            ]
        },
        {
            id: "misc",
            name: "Miscellaneous",
            description: "Other repositories and utilities",
            icon: "📦",
            colorClass: "misc",
            repositories: [
                { name: "nextjs-ai-chatbot", purpose: "Next.js AI chatbot implementation", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "app", purpose: "Generic app repository", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "Store", purpose: "Store application", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "path3-pub-track", purpose: "Path3 public tracking", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "nodeh-instrumentation-pwa", purpose: "Node-H instrumentation PWA", language: "TypeScript", status: "UNKNOWN", android: "HIGH", isPrivate: true },
                { name: "Omnichain_Bridge_wallet", purpose: "Omnichain bridge wallet", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "No_Gas_Slaps-", purpose: "No Gas Slaps variant", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "Mythos", purpose: "Mythos application", language: "TypeScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "MoodSync-MVP", purpose: "Communication context overlay for emotional state", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "TaskAgile", purpose: "Task management application", language: "JavaScript", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "damien-v2", purpose: "DAMIEN v2 implementation", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "AI-orchestrator-test", purpose: "Complete Omnifacet Observer analysis", language: "HTML", status: "UNKNOWN", android: "UNKNOWN", isPrivate: true },
                { name: "No_Gas_Labs-Omnichain_TownSquare", purpose: "Mobile-first social RPG for blockchain onboarding", language: "N/A", status: "ARCHIVED", android: "UNKNOWN", isPrivate: true }
            ]
        }
    ],
    gaps: [
        {
            id: "GAP-001",
            severity: "HIGH",
            description: "ARENA backend has integration bridges (command-center-api.ts) but they are not wired into the main API"
        },
        {
            id: "GAP-002",
            severity: "MEDIUM",
            description: "Multiple duplicate/improved system variants exist in Enhanced Systems domain"
        },
        {
            id: "GAP-003",
            severity: "HIGH",
            description: "Ninja Agent Architecture has 10 components but unknown integration status"
        },
        {
            id: "GAP-004",
            severity: "MEDIUM",
            description: "DeFi systems have multiple overlapping flash loan implementations"
        },
        {
            id: "GAP-005",
            severity: "MEDIUM",
            description: "DEF4US'28 campaign infrastructure has 12 components with unknown integration status"
        },
        {
            id: "GAP-006",
            severity: "HIGH",
            description: "AGP Podcast agents (Python) have no documented connection to ARENA backend (TypeScript)"
        }
    ]
};