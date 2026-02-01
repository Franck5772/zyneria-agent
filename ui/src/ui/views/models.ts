import { html, nothing } from "lit";
import { icons } from "../icons";

export type ModelsProps = {
    config: Record<string, unknown> | null;
    loading: boolean;
    saving: boolean;
    onPatch: (path: Array<string | number>, value: unknown) => void;
    onSave: () => void;
};

const KNOWN_PROVIDERS = [
    {
        id: "deepseek",
        name: "DeepSeek",
        desc: "Advanced reasoning models (R1, V3)",
        icon: icons.cpu,
        docs: "https://platform.deepseek.com/",
    },
    {
        id: "perplexity",
        name: "Perplexity",
        desc: "Real-time web search models",
        icon: icons.search,
        docs: "https://docs.perplexity.ai/",
    },
    {
        id: "openai",
        name: "OpenAI",
        desc: "GPT-4o, GPT-4o-mini, and embeddings",
        icon: icons.brain,
        docs: "https://platform.openai.com/",
    },
    {
        id: "anthropic",
        name: "Anthropic",
        desc: "Claude 3.5 Sonnet, Opus, and Haiku",
        icon: icons.messageSquare,
        docs: "https://docs.anthropic.com/",
    },
    {
        id: "google-generative-ai",
        name: "Google Gemini",
        desc: "Gemini 1.5 Pro, Flash models",
        icon: icons.zap,
        docs: "https://ai.google.dev/",
    },
];

export function renderModels(props: ModelsProps) {
    const providersConfig = (props.config?.models as any)?.providers || {};

    return html`
    <div class="models-view">
      <div class="models-grid">
        ${KNOWN_PROVIDERS.map((provider) => {
        const config = providersConfig[provider.id];
        const isConfigured = !!config;
        const apiKey = config?.apiKey || "";

        return html`
            <div class="model-card ${isConfigured ? "active" : ""}">
              <div class="model-card__header">
                <div class="model-card__icon">${provider.icon}</div>
                <div class="model-card__meta">
                  <div class="model-card__title">${provider.name}</div>
                  <div class="model-card__desc">${provider.desc}</div>
                </div>
                <div class="model-card__status">
                  ${isConfigured
                ? html`<span class="pill pill--ok">Active</span>`
                : html`<span class="pill">Setup</span>`}
                </div>
              </div>
              
              <div class="model-card__content">
                <div class="field">
                  <label>API Key</label>
                  <div class="input-group">
                    <input
                      type="password"
                      .value=${apiKey}
                      placeholder="sk-..."
                      @change=${(e: Event) => {
                const val = (e.target as HTMLInputElement).value;
                if (!val) {
                    // Allow clearing, but maybe warn?
                }

                // Update the provider config. 
                // If it didn't exist, we need to scaffold the basic structure.
                if (!config && val) {
                    props.onPatch(["models", "providers", provider.id], {
                        baseUrl: getBaseUrl(provider.id),
                        apiKey: val,
                        api: getApiType(provider.id),
                        models: getDefaultModels(provider.id)
                    });
                } else {
                    props.onPatch(["models", "providers", provider.id, "apiKey"], val);
                }
            }}
                    />
                  </div>
                   <div class="help-text" style="margin-top: 8px; font-size: 0.85rem; opacity: 0.7;">
                     Get your key from <a href="${provider.docs}" target="_blank" style="color: inherit; text-decoration: underline;">${provider.name} Dashboard</a>
                   </div>
                </div>
              </div>
            </div>
          `;
    })}
      </div>

       <div class="actions-footer" style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--c-border);">
            <button class="btn primary" ?disabled=${props.loading || props.saving} @click=${props.onSave}>
                ${props.saving ? "Saving Changes..." : "Save Configuration"}
            </button>
        </div>
    </div>
  `;
}

// Helpers to scaffold defaults when adding a new provider
function getBaseUrl(id: string): string {
    switch (id) {
        case "deepseek": return "https://api.deepseek.com";
        case "perplexity": return "https://api.perplexity.ai";
        case "openai": return "https://api.openai.com/v1";
        case "anthropic": return "https://api.anthropic.com/v1";
        case "google-generative-ai": return "https://generativelanguage.googleapis.com/v1beta";
        default: return "";
    }
}

function getApiType(id: string): string {
    switch (id) {
        case "deepseek": return "openai-completions";
        case "perplexity": return "openai-completions";
        case "openai": return "openai-completions";
        case "anthropic": return "anthropic-messages";
        case "google-generative-ai": return "google-generative-ai";
        default: return "openai-completions";
    }
}

function getDefaultModels(id: string): any[] {
    switch (id) {
        case "deepseek": return [
            { id: "deepseek-chat", name: "DeepSeek V3", contextWindow: 64000, maxTokens: 8000, cost: { input: 0.14, output: 0.28 } },
            { id: "deepseek-reasoner", name: "DeepSeek R1", reasoning: true, contextWindow: 64000, maxTokens: 8000, cost: { input: 0.55, output: 2.19 } }
        ];
        case "perplexity": return [
            { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro", contextWindow: 128000, maxTokens: 8000 },
            { id: "sonar-pro", name: "Sonar Pro", contextWindow: 128000, maxTokens: 8000 }
        ];
        default: return [];
    }
}
