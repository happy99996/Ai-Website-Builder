import { enhancePromptSession } from "@/configs/AiModel";
import Prompt from "@/data/Prompt";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { prompt, environment = 'react' } = await request.json();
        
        console.log('Enhancing prompt for environment:', environment);
        
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
            return NextResponse.json({ 
                error: 'API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file' 
            }, { status: 500 });
        }
        
        // Get environment-specific enhance prompt rules
        const enhanceRules = Prompt.ENHANCE_PROMPT_RULES[environment] || Prompt.ENHANCE_PROMPT_RULES.react;
        
        const result = await enhancePromptSession.sendMessage([
            enhanceRules,
            `Original prompt: ${prompt}`,
            `Target environment: ${environment}`
        ].join('\n\n'));
        
        const text = result.response.text();
        
        console.log('Enhanced prompt generated successfully');
        
        return NextResponse.json({
            enhancedPrompt: text.trim(),
            environment: environment
        });
    } catch (error) {
        console.error('Error in enhance-prompt route:', error);
        return NextResponse.json({ 
            error: error.message || 'Failed to enhance prompt',
            success: false 
        }, { status: 500 });
    }
}