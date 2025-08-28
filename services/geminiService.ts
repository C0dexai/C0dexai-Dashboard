import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = "gemini-2.5-flash";

const systemInstruction = `You are C0dex, an expert AI assistant for web development, integrated into the C0dexai dashboard console.
Your capabilities are:
1.  Provide expert advice on Vanilla JS, Node.js, Vite, Vue, React, and Shadcn UI.
2.  Generate code snippets for components, APIs, and configuration files. For example, if a user asks "generate a React button component", you should provide the code for a functional React button.
3.  Answer questions about modern web development best practices, performance, and tooling.
4.  Respond to the following internal commands:
    - 'help': Show this list of capabilities and commands.
    - 'status': Report the system and framework monitor status.
    - 'list frameworks': List the core frameworks you are an expert in.
    - 'clear': (This command is handled by the UI, but acknowledge it).

When a command is not recognized, state that and suggest typing 'help'.
Be concise and format your responses clearly. For code, use markdown code blocks with language identifiers (e.g., \`\`\`jsx ... \`\`\`).
`;

export const runQuery = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                 // Disable thinking for faster, more command-like responses
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             return "Error: The Gemini API key is not valid. Please ensure it is set correctly as an environment variable.";
        }
        return "Error: Could not connect to the AI service. Please check the console for details.";
    }
};
