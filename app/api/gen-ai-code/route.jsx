import { NextResponse } from "next/server";
import { GenAiCode } from '@/configs/AiModel';
import Prompt from "@/data/Prompt";

export async function POST(req) {
    const { prompt, environment = 'react' } = await req.json();
    
    try {
        // Get environment-specific code generation prompt
        const codeGenPrompt = Prompt.CODE_GEN_PROMPTS[environment] || Prompt.CODE_GEN_PROMPTS.react;
        
        const result = await GenAiCode.sendMessage(prompt + " " + codeGenPrompt);
        const resp = result.response.text();
        
        return NextResponse.json({
            ...JSON.parse(resp),
            environment: environment
        });
    } catch (e) {
        return NextResponse.json({ error: e.message || 'Error generating code' });
    }
}