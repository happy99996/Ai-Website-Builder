import { NextResponse } from "next/server";
import { GenAiCode } from '@/configs/AiModel';
import Prompt from "@/data/Prompt";

export async function POST(req) {
    try {
        const { prompt, environment = 'react' } = await req.json();
        
        console.log('Generating code for environment:', environment);
        console.log('Prompt received:', prompt);
        
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
            return NextResponse.json({ 
                error: 'API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file' 
            }, { status: 500 });
        }
        
        // Get environment-specific code generation prompt
        const codeGenPrompt = Prompt.CODE_GEN_PROMPTS[environment] || Prompt.CODE_GEN_PROMPTS.react;
        
        console.log('Using code generation prompt for:', environment);
        
        const result = await GenAiCode.sendMessage(prompt + " " + codeGenPrompt);
        const resp = result.response.text();
        
        console.log('AI Response received:', resp.substring(0, 200) + '...');
        
        // Try to parse the JSON response
        let parsedResponse;
        try {
            // Remove any markdown code blocks if present
            const cleanedResp = resp.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            parsedResponse = JSON.parse(cleanedResp);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            console.error('Raw response:', resp);
            return NextResponse.json({ 
                error: 'Failed to parse AI response. Please try again.',
                rawResponse: resp
            }, { status: 500 });
        }
        
        return NextResponse.json({
            ...parsedResponse,
            environment: environment
        });
    } catch (e) {
        console.error('Error in gen-ai-code route:', e);
        return NextResponse.json({ 
            error: e.message || 'Error generating code',
            details: e.toString()
        }, { status: 500 });
    }
}