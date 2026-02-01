import type { ModelDefinitionConfig } from "../config/types.models.js";

export const PERPLEXITY_MODELS: ModelDefinitionConfig[] = [
    {
        id: "sonar-reasoning-pro",
        name: "Perplexity Sonar Reasoning Pro",
        reasoning: true,
        input: ["text"],
        maxTokens: 8192,
        contextWindow: 127_000,
        cost: {
            input: 2.0, // approx
            output: 8.0,
            cacheRead: 0,
            cacheWrite: 0,
        },
    },
    {
        id: "sonar-reasoning",
        name: "Perplexity Sonar Reasoning",
        reasoning: true,
        input: ["text"],
        maxTokens: 8192,
        contextWindow: 127_000,
        cost: {
            input: 1.0,
            output: 5.0,
            cacheRead: 0,
            cacheWrite: 0,
        },
    },
    {
        id: "sonar-pro",
        name: "Perplexity Sonar Pro",
        reasoning: false,
        input: ["text"],
        maxTokens: 8192,
        contextWindow: 200_000,
        cost: {
            input: 3.0,
            output: 15.0,
            cacheRead: 0,
            cacheWrite: 0,
        },
    },
];
