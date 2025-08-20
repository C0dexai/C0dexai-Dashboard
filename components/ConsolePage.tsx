
import React, { useState, useRef, useEffect } from 'react';
import { ConsoleMessage } from '../types';
import { runQuery } from '../services/geminiService';

const ConsolePage: React.FC = () => {
    const [messages, setMessages] = useState<ConsoleMessage[]>([
        { source: 'system', content: "Welcome to the C0dex AI Web Dev Console. Type 'help' for a list of commands." },
        { source: 'system', content: `Gemini Status: ${process.env.API_KEY ? 'Connected' : 'Not Connected (API_KEY not set)'}` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [isLoading]);

    const handleCommand = async () => {
        if (!input.trim() || isLoading) return;

        const command = input.trim();
        const newMessages: ConsoleMessage[] = [...messages, { source: 'user', content: command }];

        if (command.toLowerCase() === 'clear') {
            setMessages([
                 { source: 'system', content: "Console cleared." },
            ]);
            setInput('');
            return;
        }

        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        const aiResponse = await runQuery(command);

        setMessages(prev => [...prev, { source: 'ai', content: aiResponse }]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand();
        }
    };

    const renderMessage = (msg: ConsoleMessage, index: number) => {
        switch (msg.source) {
            case 'user':
                return <div key={index}><span className="text-neon-green mr-2">&gt;</span>{msg.content}</div>;
            case 'ai':
                 return <div key={index} className="whitespace-pre-wrap"><span className="text-neon-blue mr-2">AI:</span>{msg.content}</div>;
            case 'system':
                return <div key={index} className="text-brand-text-muted">{msg.content}</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full p-6 bg-brand-dark">
            <div 
                id="terminal" 
                className="flex-1 bg-black/80 backdrop-blur-sm border border-brand-border rounded-lg p-4 font-fira-code text-sm text-brand-text overflow-y-auto"
                onClick={() => inputRef.current?.focus()}
            >
                <div id="terminal-output" className="space-y-2">
                    {messages.map(renderMessage)}
                    {isLoading && <div><span className="text-neon-pink mr-2">AI:</span><span className="animate-pulse">Thinking...</span></div>}
                    <div ref={terminalEndRef} />
                </div>
            </div>
            <div className="flex items-center mt-2 bg-black/80 backdrop-blur-sm border border-brand-border rounded-lg p-2 font-fira-code text-sm">
                <span className="text-neon-green mr-2">&gt;</span>
                <input
                    ref={inputRef}
                    type="text"
                    id="terminal-input"
                    className="bg-transparent border-none text-brand-text w-full focus:ring-0 p-0"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    autoFocus
                    placeholder="Type your command..."
                />
            </div>
        </div>
    );
};

export default ConsolePage;