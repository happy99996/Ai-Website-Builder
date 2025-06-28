"use client"
import React, { useContext, useState, useEffect } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import Environments from '@/data/Environments';
import { MessagesContext } from '@/context/MessagesContext';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Loader2Icon, Download, Globe, Code2 } from 'lucide-react';
import JSZip from 'jszip';

function CodeView() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('code');
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
    const [environment, setEnvironment] = useState('react');
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
        
        // Set environment from workspace
        const workspaceEnvironment = result?.environment || 'react';
        setEnvironment(workspaceEnvironment);
        
        // Get default files for the environment
        const defaultFiles = getDefaultFilesByEnvironment(workspaceEnvironment);
        
        // Preprocess and validate files before merging
        const processedFiles = preprocessFiles(result?.fileData || {});
        const mergedFiles = { ...defaultFiles, ...processedFiles };
        setFiles(mergedFiles);
    }

    const getDefaultFilesByEnvironment = (env) => {
        switch (env) {
            case 'wordpress':
                return Environments.WORDPRESS_DEFAULT_FILES;
            case 'html':
                return Environments.HTML_DEFAULT_FILES;
            default:
                return Lookup.DEFAULT_FILE;
        }
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
            const lastMessage = messages[messages?.length - 1];
            if (lastMessage.role === 'user') {
                GenerateAiCode();
            }
        }
    }, [messages])

    const GenerateAiCode = async () => {
        setLoading(true);
        const PROMPT = JSON.stringify(messages) + " " + (
            typeof Prompt.CODE_GEN_PROMPT === 'object' 
                ? Prompt.CODE_GEN_PROMPT[environment] 
                : Prompt.CODE_GEN_PROMPT
        );
        
        const result = await axios.post('/api/gen-ai-code', {
            prompt: PROMPT,
            environment: environment
        });
        
        // Preprocess AI-generated files
        const processedAiFiles = preprocessFiles(result.data?.files || {});
        const defaultFiles = getDefaultFilesByEnvironment(environment);
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

            // Add package.json for React projects
            if (environment === 'react') {
                const packageJson = {
                    name: "generated-project",
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
            }

            // Generate the zip file
            const blob = await zip.generateAsync({ type: "blob" });
            
            // Create download link and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${environment}-project-files.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading files:', error);
        }
    };

    const getEnvironmentIcon = () => {
        switch (environment) {
            case 'wordpress':
                return '📝';
            case 'html':
                return '🌐';
            default:
                return '⚛️';
        }
    };

    const renderPreview = () => {
        if (environment === 'wordpress') {
            return (
                <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                        <Globe className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">WordPress Preview</h3>
                        <p className="text-gray-600 mb-4">
                            WordPress themes require a WordPress installation to preview.
                        </p>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <p className="text-sm text-gray-500">
                                Download the files and upload to your WordPress installation to see the preview.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (environment === 'html') {
            // For HTML, we can show a basic preview
            const indexFile = files['/index.html'];
            if (indexFile && indexFile.code) {
                return (
                    <iframe
                        srcDoc={indexFile.code}
                        className="w-full h-[80vh] border-0"
                        title="HTML Preview"
                    />
                );
            }
        }

        // Default React preview with Sandpack
        return (
            <SandpackPreview 
                style={{ height: '80vh' }} 
                showNavigator={true}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
            />
        );
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
                        
                        {/* Environment Indicator */}
                        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                            <span className="text-lg">{getEnvironmentIcon()}</span>
                            <span className="text-sm text-gray-300 capitalize">{environment}</span>
                        </div>
                    </div>
                    
                    {/* Download Button */}
                    <button
                        onClick={downloadFiles}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download {environment.charAt(0).toUpperCase() + environment.slice(1)} Files</span>
                    </button>
                </div>
            </div>

            {environment === 'react' ? (
                <SandpackProvider 
                    files={files}
                    template="react" 
                    theme={'dark'}
                    customSetup={{
                        dependencies: {
                            ...Lookup.DEPENDANCY
                        },
                        entry: '/index.js'
                    }}
                    options={{
                        externalResources: ['https://cdn.tailwindcss.com'],
                        bundlerTimeoutSecs: 120,
                        recompileMode: "immediate",
                        recompileDelay: 300
                    }}
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
                                    wrapContent 
                                />
                            </> :
                            <>
                                {renderPreview()}
                            </>}
                        </SandpackLayout>
                    </div>
                </SandpackProvider>
            ) : (
                <div className="relative">
                    {activeTab == 'code' ? (
                        <div className="flex h-[80vh]">
                            {/* File Explorer */}
                            <div className="w-1/4 bg-gray-900 border-r border-gray-700 overflow-y-auto">
                                <div className="p-4">
                                    <h3 className="text-white font-semibold mb-3">Files</h3>
                                    <div className="space-y-1">
                                        {Object.keys(files).map((filename) => (
                                            <div key={filename} className="text-gray-300 text-sm py-1 px-2 hover:bg-gray-800 rounded cursor-pointer">
                                                <Code2 className="inline h-4 w-4 mr-2" />
                                                {filename.replace('/', '')}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Code Editor */}
                            <div className="flex-1 bg-gray-900">
                                <div className="h-full overflow-y-auto">
                                    {Object.entries(files).map(([filename, content]) => (
                                        <div key={filename} className="border-b border-gray-700">
                                            <div className="bg-gray-800 px-4 py-2 text-white font-mono text-sm">
                                                {filename}
                                            </div>
                                            <pre className="p-4 text-gray-300 font-mono text-sm overflow-x-auto">
                                                <code>{content.code || content}</code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        renderPreview()
                    )}
                </div>
            )}

            {loading && (
                <div className='p-10 bg-gray-900 opacity-80 absolute top-0 
                rounded-lg w-full h-full flex items-center justify-center'>
                    <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
                    <h2 className='text-white ml-3'>Generating {environment} files...</h2>
                </div>
            )}
        </div>
    );
}

export default CodeView;