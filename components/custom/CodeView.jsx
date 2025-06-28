"use client"
import React, { use, useContext } from 'react';
import { useState } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { useEffect } from 'react';
import { UpdateFiles } from '@/convex/workspace';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Loader2Icon, Download } from 'lucide-react';
import JSZip from 'jszip';

function CodeView() {

    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('code');
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
    const [currentEnvironment, setCurrentEnvironment] = useState('react');
    const { messages, setMessages } = useContext(MessagesContext);
    const UpdateFiles = useMutation(api.workspace.UpdateFiles);
    const convex = useConvex();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        id && GetFiles();
    }, [id])

    const GetFiles = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        
        // Set current environment
        setCurrentEnvironment(result?.environment || 'react');
        
        // Get environment-specific default files
        const defaultFiles = Lookup.DEFAULT_FILES[result?.environment || 'react'] || Lookup.DEFAULT_FILE;
        
        // Preprocess and validate files before merging
        const processedFiles = preprocessFiles(result?.fileData || {});
        const mergedFiles = { ...defaultFiles, ...processedFiles };
        setFiles(mergedFiles);
    }

    // Add file preprocessing function
    const preprocessFiles = (files) => {
        const processed = {};
        Object.entries(files).forEach(([path, content]) => {
            // Ensure the file has proper content structure
            if (typeof content === 'string') {
                processed[path] = { code: content };
            } else if (content && typeof content === 'object') {
                if (!content.code && typeof content === 'object') {
                    processed[path] = { code: JSON.stringify(content, null, 2) };
                } else {
                    processed[path] = content;
                }
            }
        });
        return processed;
    }

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role === 'user') {
                GenerateAiCode();
            }
        }
    }, [messages])

    const GenerateAiCode = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages);
        const result = await axios.post('/api/gen-ai-code', {
            prompt: PROMPT,
            environment: currentEnvironment
        });

        // Preprocess AI-generated files
        const processedAiFiles = preprocessFiles(result.data?.files || {});
        
        // Get environment-specific default files
        const defaultFiles = Lookup.DEFAULT_FILES[currentEnvironment] || Lookup.DEFAULT_FILE;
        const mergedFiles = { ...defaultFiles, ...processedAiFiles };
        setFiles(mergedFiles);

        await UpdateFiles({
            workspaceId: id,
            files: result.data?.files
        });
        setLoading(false);
    }

    const downloadFiles = async () => {
        try {
            // Create a new JSZip instance
            const zip = new JSZip();

            // Add each file to the zip
            Object.entries(files).forEach(([filename, content]) => {
                // Handle the file content based on its structure
                let fileContent;
                if (typeof content === 'string') {
                    fileContent = content;
                } else if (content && typeof content === 'object') {
                    if (content.code) {
                        fileContent = content.code;
                    } else {
                        // If it's an object without code property, stringify it
                        fileContent = JSON.stringify(content, null, 2);
                    }
                }

                // Only add the file if we have content
                if (fileContent) {
                    // Remove leading slash if present
                    const cleanFileName = filename.startsWith('/') ? filename.slice(1) : filename;
                    zip.file(cleanFileName, fileContent);
                }
            });

            // Add environment-specific package.json or configuration files
            if (currentEnvironment === 'react') {
                const packageJson = {
                    name: "generated-react-project",
                    version: "1.0.0",
                    private: true,
                    dependencies: Lookup.DEPENDANCY,
                    scripts: {
                        "dev": "vite",
                        "build": "vite build",
                        "preview": "vite preview"
                    }
                };
                zip.file("package.json", JSON.stringify(packageJson, null, 2));
            } else if (currentEnvironment === 'wordpress') {
                // Add WordPress-specific files if not already present
                if (!files['/style.css']) {
                    zip.file("style.css", `/*
Theme Name: Generated WordPress Theme
Description: AI-generated WordPress theme
Version: 1.0
*/`);
                }
            }

            // Generate the zip file
            const blob = await zip.generateAsync({ type: "blob" });

            // Create download link and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${currentEnvironment}-project-files.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading files:', error);
        }
    };

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

    // Environment-specific Sandpack configuration
    const getSandpackConfig = () => {
        switch (currentEnvironment) {
            case 'wordpress':
                return {
                    template: "vanilla",
                    customSetup: {
                        dependencies: {},
                        entry: '/index.php'
                    },
                    options: {
                        externalResources: [],
                        bundlerTimeoutSecs: 120,
                        recompileMode: "immediate",
                        recompileDelay: 300
                    }
                };
            case 'html':
                return {
                    template: "vanilla",
                    customSetup: {
                        dependencies: {},
                        entry: '/index.html'
                    },
                    options: {
                        externalResources: [],
                        bundlerTimeoutSecs: 120,
                        recompileMode: "immediate",
                        recompileDelay: 300
                    }
                };
            default: // react
                return {
                    template: "react",
                    customSetup: {
                        dependencies: {
                            ...Lookup.DEPENDANCY
                        },
                        entry: '/index.js'
                    },
                    options: {
                        externalResources: ['https://cdn.tailwindcss.com'],
                        bundlerTimeoutSecs: 120,
                        recompileMode: "immediate",
                        recompileDelay: 300
                    }
                };
        }
    };

    return (
        <div className='relative'>
            <div className='bg-[#181818] w-full p-2 border'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center flex-wrap shrink-0 bg-black p-1 justify-center
                        w-[140px] gap-3 rounded-full'>
                            <h2 onClick={() => setActiveTab('code')}
                                className={`text-sm cursor-pointer 
                            ${activeTab == 'code' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}>
                                Code</h2>

                            <h2 onClick={() => setActiveTab('preview')}
                                className={`text-sm cursor-pointer 
                            ${activeTab == 'preview' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}>
                                Preview</h2>
                        </div>
                        
                        {/* Environment indicator */}
                        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                            <span className="text-lg">{getEnvironmentIcon(currentEnvironment)}</span>
                            <span className="text-sm text-gray-300">{getEnvironmentName(currentEnvironment)}</span>
                        </div>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={downloadFiles}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download {getEnvironmentName(currentEnvironment)} Files</span>
                    </button>
                </div>
            </div>
            <SandpackProvider
                files={files}
                theme={'dark'}
                {...getSandpackConfig()}
            >
                <div className="relative">
                    <SandpackLayout>
                        {activeTab == 'code' ? <>
                            <SandpackFileExplorer style={{ height: '80vh' }} />
                            <SandpackCodeEditor
                                style={{ height: '80vh' }}
                                showTabs
                                showLineNumbers
                                showInlineErrors
                                wrapContent />
                        </> :
                            <>
                                <SandpackPreview
                                    style={{ height: '80vh' }}
                                    showNavigator={true}
                                    showOpenInCodeSandbox={false}
                                    showRefreshButton={true}
                                />
                            </>}
                    </SandpackLayout>
                </div>
            </SandpackProvider>

            {loading && <div className='p-10 bg-gray-900 opacity-80 absolute top-0 
            rounded-lg w-full h-full flex items-center justify-center'>
                <Loader2Icon className='animate-spin h-10 w-10 text-white' />
                <h2 className='text-white'> Generating {getEnvironmentName(currentEnvironment)} files...</h2>
            </div>}
        </div>
    );
}

export default CodeView;