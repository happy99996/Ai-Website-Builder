import { NextResponse } from "next/server";
import { GenAiCode } from '@/configs/AiModel';
import Prompt from '@/data/Prompt';

export async function POST(req){
    const { prompt, environment = 'react' } = await req.json();
    
    try {
        // Get the appropriate code generation prompt based on environment
        const codePrompt = typeof Prompt.CODE_GEN_PROMPT === 'object' 
            ? Prompt.CODE_GEN_PROMPT[environment] || Prompt.CODE_GEN_PROMPT.react
            : Prompt.CODE_GEN_PROMPT;
            
        const fullPrompt = `${prompt}\n\n${codePrompt}\n\nTarget Environment: ${environment}`;
        
        const result = await GenAiCode.sendMessage(fullPrompt);
        const resp = result.response.text();
        
        const parsedResponse = JSON.parse(resp);
        
        // Add environment info to response
        parsedResponse.environment = environment;
        
        return NextResponse.json(parsedResponse);
    } catch(e) {
        console.error('Code generation error:', e);
        return NextResponse.json({
            error: e.message,
            environment: environment
        });
    }
}