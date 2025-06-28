"use client";

import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const ConvexClientProvider = ({ children }) => {
    // Check if the Convex URL is provided
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    
    if (!convexUrl) {
        console.error('NEXT_PUBLIC_CONVEX_URL is not set. Please run "npx convex dev" and add the URL to your .env.local file.');
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center p-8 bg-gray-900 rounded-lg border border-red-500/20">
                    <h2 className="text-xl font-bold text-red-400 mb-4">Configuration Required</h2>
                    <p className="text-gray-300 mb-4">
                        Convex URL is not configured. Please follow these steps:
                    </p>
                    <ol className="text-left text-gray-400 space-y-2">
                        <li>1. Run <code className="bg-gray-800 px-2 py-1 rounded">npx convex dev</code> in your terminal</li>
                        <li>2. Copy the Convex URL from the output</li>
                        <li>3. Add it to your .env.local file as NEXT_PUBLIC_CONVEX_URL</li>
                        <li>4. Restart your development server</li>
                    </ol>
                </div>
            </div>
        );
    }

    const convex = new ConvexReactClient(convexUrl);
    
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
};

export default ConvexClientProvider;