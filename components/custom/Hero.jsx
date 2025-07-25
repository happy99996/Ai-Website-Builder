"use client"
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import { ArrowRight, Link, Sparkles, Send, Wand2, Loader2, Check } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function Hero() {
    const [userInput, setUserInput] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [selectedEnvironment, setSelectedEnvironment] = useState('react');
    const { messages, setMessages } = useContext(MessagesContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    const onGenerate = async (input) => {
        const msg = {
            role: 'user',
            content: input,
            environment: selectedEnvironment
        }
        setMessages(msg);
        const workspaceID = await CreateWorkspace({
            messages: [msg],
            environment: selectedEnvironment
        });
        router.push('/workspace/' + workspaceID);
    }

    const enhancePrompt = async () => {
        if (!userInput) return;
        
        setIsEnhancing(true);
        try {
            const response = await fetch('/api/enhance-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt: userInput,
                    environment: selectedEnvironment 
                }),
            });

            const data = await response.json();
            if (data.enhancedPrompt) {
                setUserInput(data.enhancedPrompt);
            }
        } catch (error) {
            console.error('Error enhancing prompt:', error);
        } finally {
            setIsEnhancing(false);
        }
    };

    const onSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
    };

    const currentSuggestions = Lookup.ENVIRONMENT_SUGGESTIONS[selectedEnvironment] || Lookup.SUGGSTIONS;

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f625,transparent)]" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-12">
                    {/* Hero Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center space-x-2 bg-electric-blue-500/20 rounded-full px-6 py-3 mb-6 border border-electric-blue-500/30">
                            <Sparkles className="h-6 w-6 text-electric-blue-400" />
                            <span className="text-electric-blue-400 text-lg font-semibold tracking-wide">
                                NEXT-GEN AI DEVELOPMENT
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-[linear-gradient(45deg,#60a5fa_30%,#ec4899)] leading-tight">
                            Code the <br className="md:hidden" />Impossible
                        </h1>
                        <p className="text-xl text-neon-cyan max-w-3xl mx-auto font-mono tracking-tight">
                            Transform your wildest ideas into production-ready code with AI-powered assistance
                        </p>
                    </div>

                    {/* Environment Selector */}
                    <div className="w-full max-w-4xl">
                        <h3 className="text-center text-xl font-semibold text-gray-300 mb-6">
                            Choose Your Development Environment
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {Object.entries(Lookup.ENVIRONMENTS).map(([key, env]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedEnvironment(key)}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                                        selectedEnvironment === key
                                            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_2px_rgba(59,130,246,0.3)]'
                                            : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-3xl">{env.icon}</span>
                                        {selectedEnvironment === key && (
                                            <Check className="h-6 w-6 text-blue-400" />
                                        )}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{env.name}</h4>
                                    <p className="text-sm text-gray-400">{env.description}</p>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${env.color} opacity-0 ${
                                        selectedEnvironment === key ? 'opacity-10' : ''
                                    } rounded-xl transition-opacity duration-300`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Modified Input Section */}
                    <div className="w-full max-w-3xl bg-gray-900/40 backdrop-blur-2xl rounded-xl border-2 border-electric-blue-500/40 shadow-[0_0_40px_5px_rgba(59,130,246,0.15)]">
                        <div className="p-2 bg-gradient-to-r from-electric-blue-500/10 to-purple-500/10">
                            <div className="bg-gray-900/80 p-6 rounded-lg">
                                <div className="flex gap-4">
                                    <textarea
                                        placeholder={`DESCRIBE YOUR ${Lookup.ENVIRONMENTS[selectedEnvironment].name.toUpperCase()} PROJECT...`}
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        className="w-full bg-transparent border-2 border-electric-blue-500/30 rounded-lg p-5 text-gray-100 placeholder-electric-blue-500/60 focus:border-electric-blue-500 focus:ring-0 outline-none font-mono text-lg h-40 resize-none transition-all duration-300 hover:border-electric-blue-500/60"
                                        disabled={isEnhancing}
                                    />
                                    <div className="flex flex-col gap-2">
                                        {userInput && (
                                            <>
                                                <button
                                                    onClick={enhancePrompt}
                                                    disabled={isEnhancing}
                                                    className={`flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl px-4 py-4 transition-all duration-200 ${isEnhancing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {isEnhancing ? (
                                                        <Loader2 className="h-8 w-8 animate-spin" />
                                                    ) : (
                                                        <Wand2 className="h-8 w-8" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => onGenerate(userInput)}
                                                    disabled={isEnhancing}
                                                    className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-4 py-4 transition-all duration-200 ${isEnhancing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    <Send className="h-8 w-8" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="text-2xl">{Lookup.ENVIRONMENTS[selectedEnvironment].icon}</span>
                                        <span>Building with {Lookup.ENVIRONMENTS[selectedEnvironment].name}</span>
                                    </div>
                                    <Link className="h-6 w-6 text-electric-blue-400/80 hover:text-electric-blue-400 transition-colors duration-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Environment-specific Suggestions Grid */}
                    <div className="w-full max-w-5xl">
                        <h3 className="text-center text-lg font-semibold text-gray-300 mb-6">
                            {Lookup.ENVIRONMENTS[selectedEnvironment].name} Project Ideas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => onSuggestionClick(suggestion)}
                                    className="group relative p-6 bg-gray-900/50 hover:bg-gray-800/60 border-2 border-electric-blue-500/20 rounded-xl text-left transition-all duration-300 hover:border-electric-blue-500/40 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,#3b82f620)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{Lookup.ENVIRONMENTS[selectedEnvironment].icon}</span>
                                        <span className="text-electric-blue-400/80 group-hover:text-electric-blue-400 font-mono text-sm tracking-wide transition-colors duration-300">
                                            {suggestion}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;