"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { ArrowRight, Link, Loader2Icon, Send } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    const { messages, setMessages } = useContext(MessagesContext);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);
    const [currentEnvironment, setCurrentEnvironment] = useState('react');
    const UpdateMessages = useMutation(api.workspace.UpdateWorkspace);

    useEffect(() => {
        id && GetWorkSpaceData();
    }, [id])

    const GetWorkSpaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        setMessages(result?.messages);
        setCurrentEnvironment(result?.environment || 'react');
        console.log(result);
    }

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role === 'user') {
                GetAiResponse();
            }
        }
    }, [messages])

    const GetAiResponse = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages);
        const result = await axios.post('/api/ai-chat', {
            prompt: PROMPT,
            environment: currentEnvironment
        });

        const aiResp = {
            role: 'ai',
            content: result.data.result,
            environment: currentEnvironment
        }
        setMessages(prev => [...prev, aiResp]);
        await UpdateMessages({
            messages: [...messages, aiResp],
            workspaceId: id
        })
        setLoading(false);
    }

    const onGenerate = (input) => {
        setMessages(prev => [...prev, {
            role: 'user',
            content: input,
            environment: currentEnvironment
        }]);
        setUserInput('');
    }

    const getEnvironmentIcon = (env) => {
        const icons = {
            react: '⚛️',
            wordpress: '📝',
            html: '🌐'
        };
        return icons[env] || '⚛️';
    };

    const getEnvironmentName = (env) => {
        const names = {
            react: 'React',
            wordpress: 'WordPress',
            html: 'HTML/CSS'
        };
        return names[env] || 'React';
    };

    return (
        <div className="relative h-[85vh] flex flex-col bg-gray-900">
            {/* Environment Header */}
            <div className="bg-gray-800/50 border-b border-gray-700 p-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{getEnvironmentIcon(currentEnvironment)}</span>
                    <div>
                        <h3 className="text-white font-semibold">
                            {getEnvironmentName(currentEnvironment)} Development
                        </h3>
                        <p className="text-gray-400 text-sm">
                            AI assistant optimized for {getEnvironmentName(currentEnvironment)} development
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
                <div className="max-w-4xl mx-auto space-y-4">
                    {Array.isArray(messages) && messages?.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg ${
                                msg.role === 'user' 
                                    ? 'bg-gray-800/50 border border-gray-700' 
                                    : 'bg-gray-800/30 border border-gray-700'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-500/20 text-blue-400' 
                                        : 'bg-purple-500/20 text-purple-400'
                                }`}>
                                    {msg.role === 'user' ? (
                                        <div className="flex items-center gap-2">
                                            <span>You</span>
                                            {msg.environment && (
                                                <span className="text-xs">
                                                    {getEnvironmentIcon(msg.environment)}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>AI</span>
                                            {msg.environment && (
                                                <span className="text-xs">
                                                    {getEnvironmentIcon(msg.environment)}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <ReactMarkdown className="prose prose-invert flex-1 overflow-auto">
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Loader2Icon className="animate-spin h-5 w-5" />
                                <p className="font-medium">
                                    Generating {getEnvironmentName(currentEnvironment)} response...
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <div className="flex gap-3">
                            <textarea
                                placeholder={`Ask about your ${getEnvironmentName(currentEnvironment)} project...`}
                                value={userInput}
                                onChange={(event) => setUserInput(event.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none h-32"
                            />
                            {userInput && (
                                <button
                                    onClick={() => onGenerate(userInput)}
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-4 transition-all duration-200"
                                >
                                    <Send className="h-6 w-6 text-white" />
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{getEnvironmentIcon(currentEnvironment)}</span>
                                <span>{getEnvironmentName(currentEnvironment)} Mode</span>
                            </div>
                            <Link className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatView;