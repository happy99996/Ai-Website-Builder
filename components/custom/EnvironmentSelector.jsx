"use client"
import React from 'react';
import Environments from '@/data/Environments';

function EnvironmentSelector({ selectedEnvironment, onEnvironmentChange }) {
    return (
        <div className="w-full max-w-4xl mb-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Choose Your Development Environment</h2>
                <p className="text-gray-400">Select the technology stack for your project</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Environments.ENVIRONMENTS.map((env) => (
                    <button
                        key={env.id}
                        onClick={() => onEnvironmentChange(env.id)}
                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedEnvironment === env.id
                                ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_2px_rgba(59,130,246,0.3)]'
                                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/60'
                        }`}
                    >
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">{env.icon}</span>
                            <h3 className="text-xl font-bold text-white">{env.name}</h3>
                        </div>
                        
                        <p className="text-gray-300 mb-4 text-sm">{env.description}</p>
                        
                        <div className="space-y-2">
                            {env.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                        
                        {selectedEnvironment === env.id && (
                            <div className="absolute top-3 right-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                            </div>
                        )}
                        
                        <div className={`absolute inset-0 bg-gradient-to-r ${env.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EnvironmentSelector;