import { chatSession } from "@/configs/AiModel";
import Prompt from "@/data/Prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt, environment = 'react' } = await req.json();

        console.log('AI Chat request for environment:', environment);
        
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
            return NextResponse.json({ 
                error: 'API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file' 
            }, { status: 500 });
        }

        // Get environment-specific chat prompt
        const chatPrompt = Prompt.CHAT_PROMPTS[environment] || Prompt.CHAT_PROMPTS.react;
        
        const result = await chatSession.sendMessage(prompt + " " + chatPrompt);
        const AIResp = result.response.text();

        console.log('AI Chat response generated successfully');

        return NextResponse.json({ 
            result: AIResp,
            environment: environment 
        });
    } catch (e) {
        console.error('Error in ai-chat route:', e);
        return NextResponse.json({ 
            error: e.message || 'Error generating chat response',
            details: e.toString()
        }, { status: 500 });
    }
}