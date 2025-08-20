
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../constants';

const LandingPage: React.FC = () => {
    return (
        <div 
            className="h-screen w-screen overflow-y-auto bg-brand-dark font-sans text-brand-text flex items-center justify-center p-4"
            // This style creates a fixed background effect that doesn't scroll with content
            style={{
                backgroundImage: `
                    radial-gradient(ellipse at 50% 100%, rgba(0, 191, 255, 0.2), transparent 50%),
                    radial-gradient(ellipse at 50% 0%, rgba(160, 32, 240, 0.2), transparent 50%),
                    radial-gradient(ellipse at center, rgba(13, 13, 13, 0), #0d0d0d 75%)
                `,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
                 <div className="p-8 md:p-12 bg-black/30 backdrop-blur-xl border border-neon-purple/30 rounded-2xl shadow-2xl shadow-neon-purple/20">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <LogoIcon />
                        <h1 
                            className="text-5xl md:text-6xl font-bold"
                            style={{ textShadow: '0 0 15px var(--tw-shadow-color)' }}
                        >
                           <span className="text-neon-purple shadow-neon-purple">C0dex</span><span className="text-neon-blue shadow-neon-blue">ai</span>
                        </h1>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue mb-4">
                        Your AI Co-Pilot for Next-Generation Web Development.
                    </h2>
                    
                    <p className="max-w-2xl text-lg text-brand-text-muted mx-auto mb-10">
                        A comprehensive dashboard for managing web development projects, interacting with code-generation AI models, and analyzing development pipelines.
                    </p>
                    
                    <Link
                        to="/app"
                        className="inline-block px-10 py-4 text-lg font-semibold text-white bg-neon-purple rounded-lg shadow-[0_0_20px] shadow-neon-purple/70 hover:bg-neon-blue hover:shadow-neon-blue/70 transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
                    >
                        Enter Dashboard
                    </Link>
                </div>
            </div>
             <style>{`
                @keyframes pulse-slow {
                    50% {
                        box-shadow: 0 0 30px var(--tw-shadow-color);
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
                .shadow-neon-purple {
                    --tw-shadow-color: #A020F0;
                }
                .shadow-neon-blue {
                     --tw-shadow-color: #00BFFF;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
