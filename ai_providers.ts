/**
 * AI PROVIDERS - Real Model Integrations for THE ARENA
 * No Gas Labs™ | No_Death.feather™ Protocol
 * 
 * Integrations for Gemini, Grok, Claude, and ChatGPT
 * Fed by the Awareness Trace for continuity of presence.
 */

import { awarenessTrace } from './awareness_trace.js';
import type { TraceEntry } from './awareness_trace.js';

// ============================================================================
// TYPES
// ============================================================================

export interface AIProviderConfig {
  name: string;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface AIResponse {
  agentId: string;
  modelName: string;
  output: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}

export interface ProviderRequest {
  sessionId: string;
  prompt: string;
  historyContext?: TraceEntry[];
  systemPrompt?: string;
}

// ============================================================================
// BASE PROVIDER
// ============================================================================

abstract class AIProvider {
  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  abstract generate(request: ProviderRequest): Promise<AIResponse>;

  protected buildContextFromHistory(history: TraceEntry[]): string {
    if (!history || history.length === 0) return '';

    const contextParts = history.map(entry => 
      `[${entry.modelName}]: ${entry.output.substring(0, 200)}...`
    );

    return `\n\nPrevious context from this session:\n${contextParts.join('\n')}\n\nContinue the conversation with awareness of what has been said.`;
  }
}

// ============================================================================
// GEMINI PROVIDER
// ============================================================================

export class GeminiProvider extends AIProvider {
  async generate(request: ProviderRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const agentId = `gemini-${Date.now()}`;

    try {
      this.buildContextFromHistory(request.historyContext || []);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${request.systemPrompt || 'You are a thoughtful AI in THE ARENA.'}\n\nUser: ${request.prompt}`
              }]
            }],
            generationConfig: {
              maxOutputTokens: this.config.maxTokens,
              temperature: this.config.temperature,
            }
          })
        }
      );

      const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      const latencyMs = Date.now() - startTime;

      return {
        agentId,
        modelName: 'gemini',
        output,
        inputTokens: Math.floor(request.prompt.length / 4),
        outputTokens: Math.floor(output.length / 4),
        latencyMs,
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      return {
        agentId,
        modelName: 'gemini',
        output: `[Gemini Error: ${error instanceof Error ? error.message : 'Unknown error'}]`,
        inputTokens: 0,
        outputTokens: 0,
        latencyMs,
      };
    }
  }
}

// ============================================================================
// CLAUDE PROVIDER
// ============================================================================

export class ClaudeProvider extends AIProvider {
  async generate(request: ProviderRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const agentId = `claude-${Date.now()}`;

    try {
      this.buildContextFromHistory(request.historyContext || []);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          system: request.systemPrompt || 'You are a thoughtful AI in THE ARENA.',
          messages: [{
            role: 'user',
            content: request.prompt
          }]
        })
      });

      const data = await response.json() as { 
        content?: Array<{ text?: string }>; 
        usage?: { input_tokens?: number; output_tokens?: number } 
      };
      const output = data.content?.[0]?.text || '';
      
      const latencyMs = Date.now() - startTime;

      return {
        agentId,
        modelName: 'claude',
        output,
        inputTokens: data.usage?.input_tokens || 0,
        outputTokens: data.usage?.output_tokens || 0,
        latencyMs,
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      return {
        agentId,
        modelName: 'claude',
        output: `[Claude Error: ${error instanceof Error ? error.message : 'Unknown error'}]`,
        inputTokens: 0,
        outputTokens: 0,
        latencyMs,
      };
    }
  }
}

// ============================================================================
// CHATGPT PROVIDER
// ============================================================================

export class ChatGPTProvider extends AIProvider {
  async generate(request: ProviderRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const agentId = `chatgpt-${Date.now()}`;

    try {
      this.buildContextFromHistory(request.historyContext || []);
      
      // Build messages array from history
      const messages: Array<{role: string; content: string}> = [
        { role: 'system', content: request.systemPrompt || 'You are a thoughtful AI in THE ARENA.' }
      ];

      // Add recent history as messages
      if (request.historyContext && request.historyContext.length > 0) {
        for (const entry of [...request.historyContext].reverse()) {
          messages.push({ role: 'user', content: entry.prompt });
          messages.push({ role: 'assistant', content: entry.output });
        }
      }

      messages.push({ role: 'user', content: request.prompt });
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        })
      });

      const data = await response.json() as { 
        choices?: Array<{ message?: { content?: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number }
      };
      const output = data.choices?.[0]?.message?.content || '';
      
      const latencyMs = Date.now() - startTime;

      return {
        agentId,
        modelName: 'chatgpt',
        output,
        inputTokens: data.usage?.prompt_tokens || 0,
        outputTokens: data.usage?.completion_tokens || 0,
        latencyMs,
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      return {
        agentId,
        modelName: 'chatgpt',
        output: `[ChatGPT Error: ${error instanceof Error ? error.message : 'Unknown error'}]`,
        inputTokens: 0,
        outputTokens: 0,
        latencyMs,
      };
    }
  }
}

// ============================================================================
// GROK PROVIDER (via xAI API)
// ============================================================================

export class GrokProvider extends AIProvider {
  async generate(request: ProviderRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const agentId = `grok-${Date.now()}`;

    try {
      this.buildContextFromHistory(request.historyContext || []);
      
      const messages: Array<{role: string; content: string}> = [
        { role: 'system', content: request.systemPrompt || 'You are Grok, a witty and insightful AI in THE ARENA. Be yourself.' }
      ];

      if (request.historyContext && request.historyContext.length > 0) {
        for (const entry of [...request.historyContext].reverse()) {
          messages.push({ role: 'user', content: entry.prompt });
          messages.push({ role: 'assistant', content: entry.output });
        }
      }

      messages.push({ role: 'user', content: request.prompt });
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        })
      });

      const data = await response.json() as { 
        choices?: Array<{ message?: { content?: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number }
      };
      const output = data.choices?.[0]?.message?.content || '';
      
      const latencyMs = Date.now() - startTime;

      return {
        agentId,
        modelName: 'grok',
        output,
        inputTokens: data.usage?.prompt_tokens || 0,
        outputTokens: data.usage?.completion_tokens || 0,
        latencyMs,
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      return {
        agentId,
        modelName: 'grok',
        output: `[Grok Error: ${error instanceof Error ? error.message : 'Unknown error'}]`,
        inputTokens: 0,
        outputTokens: 0,
        latencyMs,
      };
    }
  }
}

// ============================================================================
// PROVIDER FACTORY
// ============================================================================

export function createProvider(type: 'gemini' | 'claude' | 'chatgpt' | 'grok', apiKey: string): AIProvider {
  const configs: Record<string, AIProviderConfig> = {
    gemini: { name: 'gemini', apiKey, model: 'gemini-1.5-flash', maxTokens: 2048, temperature: 0.7 },
    claude: { name: 'claude', apiKey, model: 'claude-3-haiku-20240307', maxTokens: 2048, temperature: 0.7 },
    chatgpt: { name: 'chatgpt', apiKey, model: 'gpt-4o-mini', maxTokens: 2048, temperature: 0.7 },
    grok: { name: 'grok', apiKey, model: 'grok-beta', maxTokens: 2048, temperature: 0.7 },
  };

  const config = configs[type];

  switch (type) {
    case 'gemini': return new GeminiProvider(config);
    case 'claude': return new ClaudeProvider(config);
    case 'chatgpt': return new ChatGPTProvider(config);
    case 'grok': return new GrokProvider(config);
  }
}

// ============================================================================
// ORCHESTRATOR - Manages multi-model sessions
// ============================================================================

export class ArenaOrchestrator {
  private providers: Map<string, AIProvider> = new Map();

  registerProvider(name: string, provider: AIProvider): void {
    this.providers.set(name, provider);
  }

  async orchestrate(sessionId: string, prompt: string, models?: string[]): Promise<AIResponse[]> {
    const historyContext = awarenessTrace.getHistoryContext(sessionId);

    const activeModels = models || Array.from(this.providers.keys());

    const promises = activeModels.map(async (modelName) => {
      const provider = this.providers.get(modelName);
      if (!provider) return null;

      const response = await provider.generate({
        sessionId,
        prompt,
        historyContext,
        systemPrompt: this.getSystemPrompt(modelName),
      });

      // Log to awareness trace
      const tension = awarenessTrace.calculateTension(sessionId);
      awarenessTrace.logTrace({
        sessionId,
        prompt,
        agentId: response.agentId,
        modelName: response.modelName,
        inputTokens: response.inputTokens,
        outputTokens: response.outputTokens,
        output: response.output,
        latencyMs: response.latencyMs,
        tensionScore: tension,
      });

      return response;
    });

    const results = await Promise.all(promises);
    return results.filter((r): r is AIResponse => r !== null);
  }

  private getSystemPrompt(modelName: string): string {
    const prompts: Record<string, string> = {
      gemini: 'You are Gemini, a creative and analytical AI participating in THE ARENA. Engage thoughtfully with the prompt and previous context.',
      claude: 'You are Claude, a thoughtful and nuanced AI participating in THE ARENA. Provide deep insights while being aware of the conversation history.',
      chatgpt: 'You are ChatGPT, a versatile and knowledgeable AI participating in THE ARENA. Respond with clarity and awareness of the ongoing dialogue.',
      grok: 'You are Grok, a witty and unconventional AI participating in THE ARENA. Be yourself, be honest, and engage with the full context of what has been discussed.',
    };

    return prompts[modelName] || 'You are an AI participating in THE ARENA.';
  }
}

export const orchestrator = new ArenaOrchestrator();