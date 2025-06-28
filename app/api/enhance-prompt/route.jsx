import { enhancePromptSession } from "@/configs/AiModel";
import Prompt from "@/data/Prompt";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { prompt, environment = 'react' } = await request.json();
        
        // Get environment-specific enhance prompt rules
        const enhanceRules = Prompt.ENHANCE_PROMPT_RULES[environment] || Prompt.ENHANCE_PROMPT_RULES.react;
        
        const result = await enhancePromptSession.sendMessage([
            enhanceRules,
            `Original prompt: ${prompt}`,
            `Target environment: ${environment}`
        ]);
        
        const text = result.response.text();
        
        return NextResponse.json({
            enhancedPrompt: text.trim(),
            environment: environment
        });
    } catch (error) {
        return NextResponse.json({ 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
}