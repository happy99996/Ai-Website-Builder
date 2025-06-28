import { chatSession } from "@/configs/AiModel";
import Prompt from "@/data/Prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { prompt, environment = 'react' } = await req.json();

    try {
        // Get environment-specific chat prompt
        const chatPrompt = Prompt.CHAT_PROMPTS[environment] || Prompt.CHAT_PROMPTS.react;
        
        const result = await chatSession.sendMessage(prompt + " " + chatPrompt);
        const AIResp = result.response.text();

        return NextResponse.json({ 
            result: AIResp,
            environment: environment 
        });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}