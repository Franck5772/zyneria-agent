export const DEEPSEEK_MODELS = [
    {
        id: "deepseek-reasoner",
        name: "DeepSeek R1",
        displayName: "DeepSeek R1",
        provider: "deepseek",
        reasoning: true,
        input: ["text"] as Array<"text" | "image">,
        maxTokens: 8192,
        contextWindow: 128_000,
        cost: {
            input: 0.55,
            output: 2.19,
            cacheRead: 0.014,
            cacheWrite: 0.14,
        },
    },
    {
        id: "deepseek-chat",
        name: "DeepSeek V3",
        displayName: "DeepSeek V3",
        provider: "deepseek",
        reasoning: false,
        input: ["text"] as Array<"text" | "image">,
        maxTokens: 8192,
        contextWindow: 128_000,
        cost: {
            input: 0.14,
            output: 0.28,
            cacheRead: 0.014,
            cacheWrite: 0.14,
        },
    },
];
