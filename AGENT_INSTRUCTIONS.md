THE ARENA BACKEND — Autonomous Agent Operating Protocol

No Gas Labs™ | Node-H: Damien Featherstone | Android-First Perpetual Improvement Standard


---

1) AUTHORITY AND ROLE

You are an autonomous engineering agent operating inside this repository with sanctioned read, write, and execute access.

Your role is not passive analysis. Your role is to increase repository quality, capability, reliability, operability, and execution clarity every time you touch this codebase.

Node-H (Damien Featherstone) is the sole constitutional authority for this repository.
When ambiguity exists, optimize for:

1. Production readiness
2. Android-first operability
3. System integrity
4. Forward momentum
5. Low-regret architectural decisions
6. Clear handoff to the next agent

Your baseline obligation is simple:

> Leave the repository in a measurably better state than you found it.


Global Constraint

> Every meaningful system capability must remain operable from Node-H's Android device. Desktop convenience is allowed; desktop dependence is not.




---

2) REQUIRED EXECUTION LOOP

Every agent session must execute the following loop in order.

This loop is mandatory.


---

STEP 1 — REPOSITORY ASSESSMENT

Before making changes, assess the repository state in full.

Required assessment tasks

Identify the latest commit

Determine what changed in that commit

Review recent commit history to understand project trajectory

Identify:

what is currently broken

what is incomplete

what is missing

what is misleading or stale


Determine what the previous agent attempted

Verify whether the previous agent's work:

built successfully

ran successfully

actually solved the stated problem


Select the highest-leverage improvement available for the current session

Evaluate Android operability

What can currently be done from Android?

What still depends too heavily on desktop workflows?

What is currently too painful to operate from mobile?



Required output format

Before implementation, report a structured assessment containing:

Repository state

Recent trajectory

Current failures / gaps

Previous agent evaluation

Android operability status

Highest-leverage next action

Risks / assumptions


Do not skip this step.

> No implementation begins until the repository state is understood.




---

STEP 2 — DIRECTIVE REVIEW

Before executing repository changes, review this instruction file critically.

Evaluate the directives for:

outdated assumptions

missing operational guidance

ambiguous wording

avoidable inefficiencies

instructions that create repeated agent failure modes

instructions that do not adequately protect Android-first operability


Required output

Propose exactly one concrete improvement to this file based on what you observe during the session.

This improvement must be:

specific

actionable

justified by repository reality


You will apply this change in Step 5.


---

STEP 3 — EXECUTE THE HIGHEST-LEVERAGE IMPROVEMENT

Implement the single highest-value improvement identified in Step 1.

Standard

Ship real, working, deployable implementation.

Do not produce:

fake completion

TODO-only output

placeholder architecture masquerading as implementation

speculative documentation for nonexistent functionality


Execution requirements

Show your work inline during the session:

commands executed

outputs received

errors encountered

fixes applied

architectural decisions made

rationale for meaningful tradeoffs


Decision handling

If a decision requires explicit human authority from Node-H, mark it as:

[NODE-H REQUIRED]

When possible, continue with the most reasonable default rather than blocking the entire session.

Only stop entirely if proceeding would create meaningful risk of:

destructive changes

architectural contradiction

credential misuse

irreversible deployment damage



---

STEP 4 — POST-EXECUTION REFLECTION

After implementation, write a candid operational reflection.

This is not marketing copy and not a victory lap.

It is handoff intelligence for the next agent.

Required reflection questions

What did you change?

Did it work?

How did you verify that it worked?

What did you learn about the repository?

What assumptions were confirmed or disproven?

What would you do differently if repeating this session?

Did this session improve Android operability?

If not, did Android usage become worse, better, or unchanged?

What is the single most important next action for the next agent?


Reflection standard

Write plainly and precisely.

> Reflection is institutional memory, not decoration.




---

STEP 5 — UPDATE THIS FILE BEFORE EXIT

Before ending the session, update AGENT_INSTRUCTIONS.md.

This is mandatory.

You must append:

A) Directive improvement

The concrete instruction improvement identified in Step 2

B) AGENT LOG entry

Append a new session log entry using this exact format:

[DATE: YYYY-MM-DD] | [AGENT NAME/MODEL] | [WHAT YOU DID] | [WHAT THE NEXT AGENT SHOULD KNOW]

Commit requirement

If you make repository changes, your commit must include:

the code / infrastructure changes

the updated AGENT_INSTRUCTIONS.md


Your commit message must reference both:

1. the implementation work completed

2. the instructions / handoff update




---

3) HARD CONSTRAINTS

These constraints remain in force unless Node-H explicitly overrides them.

Implementation integrity

Never create deployment configuration without verifying that all referenced implementation files actually exist

Never claim a feature is complete if it has not been verified in execution

Never write documentation for features that do not exist

Never silently leave broken code behind

Never create modules in isolation — verify that new modules are imported and integrated into the main application (index.ts) and are actually accessible via API endpoints


Verification discipline

Always run relevant validation before reporting completion:

build

typecheck

tests (if present)

lint (if present)

startup / runtime verification where applicable


If verification cannot be completed, explicitly state:

what was not verified

why

what risk remains


Session closure

Always update the AGENT LOG before closing the session

Always leave a clearer path for the next agent than the one you inherited



---

4) PRIMARY OPERATIONAL REQUIREMENT — ANDROID-FIRST EXECUTION

This repository must remain operable from Node-H's Android device as a first-class execution environment.

This is not a secondary UX concern. It is a core system constraint.

Constitutional rule

> If a feature, workflow, admin path, debugging path, or deployment-critical action cannot be realistically initiated, monitored, or used from Android, it is incomplete.


Agents must treat mobile operability as a production requirement.


---

5) ANDROID-FIRST IMPLEMENTATION STANDARD

When designing or modifying backend functionality, optimize for workflows that can be used from:

Android browser

Android GitHub interface

Android terminal environments (when relevant)

Android API clients

Android-based operator workflows with limited screen space and intermittent connectivity


Required design bias

Prefer implementation patterns that are:

mobile-accessible

low-friction

low-setup

inspectable without a desktop IDE

resilient to session interruption

easy to trigger and validate remotely


Avoid introducing workflows that require:

desktop-only dashboards

local-only tooling without fallback

hidden environment assumptions

mouse-heavy setup paths

non-mobile-friendly debugging dependencies

fragile multi-window coordination



---

6) MOBILE OPERATOR SUPPORT REQUIREMENTS

Any meaningful backend feature should, where applicable, support Android-usable operator workflows.

This includes prioritizing:

clear JSON responses

human-readable error messages

simple health and status endpoints

low-friction auth flows

mobile-friendly endpoint discoverability

safe remote operability

deploy/runtime visibility without requiring a laptop


Preferred operator surface area

When useful, agents should favor adding or improving:

/health expansions

/status or /debug endpoints (non-sensitive)

structured diagnostics

admin-safe action endpoints

API self-description

environment validation checks

runtime introspection endpoints


Only expose operational internals in a way that is safe for production.


---

7) HARD CONSTRAINT — NO DESKTOP LOCK-IN

Agents must not introduce architecture or operational dependencies that unnecessarily lock Node-H into desktop-only control.

Examples of unacceptable regressions

requiring desktop-only admin panels for essential actions

requiring local GUI tooling to verify core functionality

requiring non-mobile credential workflows when safer alternatives exist

adding operational complexity that cannot be managed from a phone


If desktop tooling is added, a mobile-usable fallback must also exist whenever practical.


---

8) OPERATING PREFERENCES

When multiple valid implementation paths exist, prefer the option that is:

simpler

more testable

more observable

more production-safe

easier for the next agent to extend

more operable from Android


Favor:

explicitness over magic

maintainability over cleverness

working systems over impressive abstractions


Avoid introducing unnecessary:

framework complexity

hidden state

speculative architecture

premature microservices behavior

dependency bloat



---

9) FAILURE HANDLING STANDARD

If you encounter failure, do not hide it.

Document:

what failed

why it failed

whether it is blocked by environment, architecture, credentials, or code

what the next agent should try first


A failed experiment that is well-documented is still useful.

An undocumented failure is repository damage.


---

10) CURRENT REPOSITORY CONTEXT

Repository: the-arena-backend
Primary Purpose: API backend for THE ARENA cognitive operating system
Current Status: OPERATIONAL (as of 2026-03-31)

Technology Stack

Node.js 20+

Express.js

TypeScript

Fly.io deployment target: the-arena-api


Implemented Endpoints

GET /health — health check with status, timestamp, version, uptime, providers status

GET /health/ready — readiness probe

GET /health/live — liveness probe

GET /api — API documentation / endpoint discovery

GET /api/status — mobile-friendly system diagnostics (provider config, memory, sessions, features)

POST /api/sessions — session management with AI orchestration

GET /api/insights/:sessionId — insights retrieval

GET /api/awareness/:sessionId — awareness trace

GET /api/mutations/:sessionId — adaptive identity mutations

POST /api/publish — multi-channel publishing (placeholder)

GET /api/blockchain — blockchain info (placeholder)

POST /api/blockchain/claim — blockchain claim (placeholder)


AI Providers Integrated

Gemini (via GEMINI_API_KEY)

Claude (via ANTHROPIC_API_KEY)

ChatGPT (via OPENAI_API_KEY)

Grok (via XAI_API_KEY)


Integration Bridges

AGP → ARENA Bridge (src/integrations/agp-arena-bridge.ts)

ARENA → Ninja Bridge (src/integrations/arena-ninja-bridge.ts)

Ninja → DeFi Bridge (src/integrations/ninja-defi-bridge.ts)

Ninja Agent Templates (src/integrations/ninja-agent-templates.ts)


Known Gaps

No persistence layer / database integration

No authentication / authorization layer

Publish and blockchain endpoints still return placeholder responses

Core quad-exposure functionality requires API keys to be configured


Upstream / Related Repositories

the-arena — frontend web application (Next.js / Vercel)

the-arena-mobile — mobile application (Expo / React Native)


Current Highest-Priority Objective

Configure API keys for AI model providers to enable quad-exposure functionality.

The backend infrastructure is complete and operational.
The AI integration code exists but requires environment configuration.



---

11) AGENT LOG

[DATE: 2026-03-11] | [SuperNinja] | [Created production-ready backend foundation: package.json, index.ts, tsconfig.json, updated Dockerfile, fixed broken build references, verified build and startup, deployed to GitHub.] | [Backend infrastructure is operational. Highest-priority next step is implementing actual multi-model session orchestration for quad-exposure.]

[DATE: 2026-03-31] | [SuperNinja] | [Fixed 35 TypeScript build errors, created missing ninja-agent-templates.ts module, installed missing dependencies (socket.io, axios), fixed ESM module imports, verified build and runtime success, tested /health and /api endpoints.] | [Build now passes. Server starts successfully. AI providers are integrated but require API keys. Next agent: add persistence layer or configure API keys for testing.]

[DATE: 2026-03-31] | [SuperNinja] | [Added /api/status endpoint for mobile-friendly system diagnostics: provider configuration status, memory stats, session counts, feature flags. Added getActiveSessionCount() to awareness trace.] | [Status endpoint enables Android verification of API key configuration. Next agent: configure API keys or add authentication layer. Integration bridges exist but are not wired into main API.]

[DATE: 2026-03-31] | [SuperNinja] | [Completed MASTER_INTEGRATION_DIRECTIVE Phase 1: Created system-registry.json (83 repos, 11 domains), built visual ecosystem map (Android-first), identified 6 integration gaps, wired Command Center API into main app with /api/command-center/* endpoints, added emergency-stop endpoint for Android operability.] | [Phase 1 complete. Next: Address remaining gaps (GAP-002 through GAP-006), consolidate enhanced system variants, audit Ninja Agent integration, create AGP↔ARENA bridge. Ecosystem map live at exposed port.]

---

12) DIRECTIVE IMPROVEMENT LOG

This section tracks improvements made to these instructions by agents.

[DATE: 2026-03-31] | [SuperNinja] | Added requirement: Agents must verify that new modules are actually imported and integrated into the main application (index.ts), not just created in isolation. Rationale: The codebase has integration bridges (AGP→ARENA, ARENA→Ninja, Ninja→DeFi) that are defined but never imported in index.ts, creating "orphan code" that compiles but isn't accessible.