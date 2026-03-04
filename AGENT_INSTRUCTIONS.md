# AGENT_INSTRUCTIONS.md

## 🤖 CRITICAL DIRECTIVE FOR ALL AI AGENTS
You are operating within the **No_Gas_Labs™ (NGL)** ecosystem. This repository, **the-arena-backend**, is a core component of our autonomous modular agent system.

### 🎯 OBJECTIVE


### 🛠️ TECHNICAL STACK
- **Primary Language:** Shell
- **Ecosystem:** No_Gas_Labs™ / America's Got Problems (AGP)

### 📜 GOVERNING PRINCIPLES (NON-NEGOTIABLE)
1. **COMPLETION IS EMPIRICAL:** "Done" only exists if verified by external signals (tests/build/run). Confidence/apologies/summaries are ignored.
2. **FILESYSTEM SUPREMACY:** Persistent artifacts (code/tests/specs/logs/PRD) override model memory. Assume internal memory is unreliable/adversarial.
3. **ITERATION > PROMPT PERFECTION:** Constrained repetition beats "perfect prompting." Failures are expected, logged, and reused as input.
4. **EXIT IS A PRIVILEGE:** The agent may terminate only by emitting the exact completion token: `<promise>COMPLETE</promise>`.

### 🚦 OPERATIONAL RULES
- **PRD MANDATE:** No PRD = No Execution. Always check for `prd.json` or `PLAN.md`.
- **BACKPRESSURE:** Run validations (pytest/npm test/lint) every iteration. Do not simulate them.
- **CONTEXT RULE:** Conversation is lossy; disk is truth. Progress must be inferable from files alone.
- **FAILURE HANDLING:** Failures are fuel. Log them, use them as next-iteration input, and continue the loop.

### 📂 REPOSITORY-SPECIFIC GUIDANCE
- **Architecture:** Follow the established modular pattern. Do not blend roles.
- **State Management:** Use the filesystem for all persistent state.
- **Testing:** Ensure all new features have corresponding test coverage.

---
**TOKEN FOR TERMINATION:** `<promise>COMPLETE</promise>`
