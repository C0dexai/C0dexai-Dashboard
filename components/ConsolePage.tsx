import React, { useState, useRef, useEffect } from 'react';
import { ConsoleMessage, RepoNode, Folder } from '../types';
import { runQuery } from '../services/geminiService';
import { INITIAL_REPO_STRUCTURE } from '../constants';

// Syntax Highlighting imports
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml'; // for HTML/JSX
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

// Register languages for syntax highlighting
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

interface CodeBlockProps {
    language: string;
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <div className="my-2 bg-black/50 border border-brand-border rounded-lg overflow-hidden text-sm">
            <div className="flex justify-between items-center px-4 py-1 bg-white/5 text-xs text-brand-text-muted">
                <span>{language}</span>
                <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="hover:text-neon-green transition-colors flex items-center gap-1 p-1 -mr-1"
                    aria-label="Copy code"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    Copy
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-brand-text"><code ref={codeRef} className={`language-${language}`}>{code}</code></pre>
        </div>
    );
};

const findPathCompletions = (partialPath: string): string[] => {
    const root = INITIAL_REPO_STRUCTURE;
    
    // Normalize path, remove leading '/' for easier processing
    const normalizedPath = partialPath.startsWith('/') ? partialPath.slice(1) : partialPath;
    const parts = normalizedPath.split('/');
    
    const toComplete = parts.pop() || '';
    const dirParts = parts;

    let currentLevel = root.children;
    let pathPrefix = partialPath.startsWith('/') ? '/' : '';

    // Traverse to the target directory
    for (const part of dirParts) {
        if (!part) continue;
        const nextDir = currentLevel.find(node => node.name === part && node.type === 'folder') as Folder;
        if (nextDir) {
            currentLevel = nextDir.children;
            pathPrefix += part + '/';
        } else {
            return []; // Invalid path
        }
    }

    // Find completions in the current directory
    const completions = currentLevel
        .filter(node => node.name.startsWith(toComplete))
        .map(node => {
            const completion = pathPrefix + node.name;
            return node.type === 'folder' ? completion + '/' : completion;
        });
    
    return completions;
};


const ConsolePage: React.FC = () => {
    const [messages, setMessages] = useState<ConsoleMessage[]>([
        { source: 'system', content: "Welcome to the C0dex AI Web Dev Console. Type 'help' for a list of commands." },
        { source: 'system', content: `Gemini Status: ${process.env.API_KEY ? 'Connected' : 'Not Connected (API_KEY not set)'}` }
    ]);
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands = ['help', 'status', 'list frameworks', 'clear', 'cat', 'analyze'];
    const commandsWithFilePaths = ['cat', 'analyze'];

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
        const [cmd, ...args] = command.split(/\s+/);

        if (cmd.toLowerCase() === 'clear') {
            setMessages([
                 { source: 'system', content: "Console cleared." },
            ]);
            setInput('');
            return;
        }
        
        if (commandsWithFilePaths.includes(cmd.toLowerCase())) {
            const path = args[0];
            if (!path) {
                setMessages([...newMessages, {source: 'system', content: `Usage: ${cmd} <file_path>`}]);
                setInput('');
                return;
            }
            
            const findNodeByPath = (nodes: RepoNode[], path: string): RepoNode | null => {
              for (const node of nodes) {
                if (node.path === path) return node;
                if (node.type === 'folder' && path.startsWith(node.path + (node.path === '/' ? '' : '/'))) {
                  const found = findNodeByPath(node.children, path);
                  if (found) return found;
                }
              }
              return null;
            };

            const node = findNodeByPath(INITIAL_REPO_STRUCTURE.children, path);
            if (node) {
                if (node.type === 'file') {
                    if (cmd.toLowerCase() === 'cat') {
                        const lang = path.split('.').pop() || 'plaintext';
                        const content = `\`\`\`${lang}\n${node.content}\n\`\`\``;
                        setMessages([...newMessages, { source: 'ai', content: content }]);
                    } else if (cmd.toLowerCase() === 'analyze') {
                         setMessages([...newMessages, { source: 'system', content: `Analyzing ${path}... Done.` }]);
                    }
                } else {
                    setMessages([...newMessages, { source: 'system', content: `${path} is a directory.` }]);
                }
            } else {
                setMessages([...newMessages, { source: 'system', content: `File not found: ${path}` }]);
            }

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (!value.trim()) {
            setSuggestion('');
            return;
        }

        const parts = value.split(/\s+/);
        const commandPart = parts[0].toLowerCase();

        // Autocomplete file paths
        if (parts.length > 1 && commandsWithFilePaths.includes(commandPart) && value.endsWith(parts[parts.length - 1])) {
            const partialPath = parts[parts.length - 1];
            if (partialPath) {
                const completions = findPathCompletions(partialPath);
                if (completions.length === 1) {
                    const fullSuggestion = [...parts.slice(0, -1), completions[0]].join(' ');
                    setSuggestion(fullSuggestion);
                    return;
                }
            }
        }
        // Autocomplete commands
        else if (parts.length === 1) {
            const match = commands.find(c => c.startsWith(value.toLowerCase()));
            if (match && match !== value.toLowerCase()) {
                setSuggestion(match);
                return;
            }
        }
        
        setSuggestion('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand();
            setSuggestion('');
        } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion && inputRef.current?.selectionStart === input.length) {
            e.preventDefault();
            setInput(suggestion);
            setSuggestion('');
        }
    };

    const renderMessage = (msg: ConsoleMessage, index: number) => {
        switch (msg.source) {
            case 'user':
                return <div key={index}><span className="text-neon-green mr-2">&gt;</span>{msg.content}</div>;
            case 'ai':
                const content = typeof msg.content === 'string' ? msg.content : '';
                // Split by code blocks, keeping the delimiters, and filter out empty strings
                const parts = content.split(/(```(?:[\w-]+)?\n[\s\S]*?```)/g).filter(Boolean);

                return (
                    <div key={index} className="flex items-start">
                        <span className="text-neon-blue mr-2 shrink-0">AI:</span>
                        <div className="flex-1 min-w-0"> {/* min-w-0 is important for flex children to wrap */}
                            {parts.map((part, i) => {
                                const codeBlockMatch = /```([\w-]+)?\n([\s\S]*?)```/.exec(part);
                                if (codeBlockMatch) {
                                    const language = codeBlockMatch[1] || 'plaintext';
                                    const code = codeBlockMatch[2].trim();
                                    return <CodeBlock key={i} language={language} code={code} />;
                                }
                                // Render text parts with whitespace-pre-wrap to preserve formatting like newlines
                                return <p key={i} className="whitespace-pre-wrap">{part}</p>;
                            })}
                        </div>
                    </div>
                );
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
                <div className="relative w-full">
                    <input
                        type="text"
                        className="bg-transparent border-none text-brand-text-muted w-full focus:ring-0 p-0 absolute top-0 left-0 pointer-events-none"
                        value={input.length < suggestion.length ? suggestion : ''}
                        readOnly
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        id="terminal-input"
                        className="bg-transparent border-none text-brand-text w-full focus:ring-0 p-0 relative"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        autoFocus
                        placeholder="Type your command..."
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsolePage;