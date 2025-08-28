import React, { useState, useEffect, useCallback } from 'react';
import { AgentCommand, File, Folder, ProjectTemplate, RepoNode } from '../types';
import { AGENT_COMMANDS, INITIAL_REPO_STRUCTURE, PROJECT_TEMPLATES, LogoIcon, AIFamilyIcon } from '../constants';

// --- ICONS ---
const FolderIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 flex-shrink-0 text-yellow-400">
        {isOpen ? <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/> : <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3a2 2 0 0 0-1.7-1H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16Z"/>}
    </svg>
);
const FileIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 flex-shrink-0 text-brand-text-muted"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const ChevronRight: React.FC<{ isOpen: boolean }> = ({ isOpen }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 mr-1 transition-transform ${isOpen ? 'rotate-90' : ''}`}><path d="m9 18 6-6-6-6"/></svg>;
const NewFileIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>;
const CommitIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const UploadIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const DownloadIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const StageIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const UnstageIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const TargetIcon: React.FC<{ target: AgentCommand['target'] }> = ({ target }) => {
    const commonClasses = "h-4 w-4 mr-2 flex-shrink-0";
    switch(target) {
        case 'container': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${commonClasses} text-neon-blue`}><path d="m21 16-4 4-4-4"/><path d="m17 20V4"/><path d="m3 8 4-4 4 4"/><path d="m7 4v16"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>;
        case 'AI': return <LogoIcon />;
        case 'system': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${commonClasses} text-neon-green`}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
        case 'shell': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${commonClasses} text-neon-pink`}><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>;
        case 'AI Family': return <AIFamilyIcon />;
        default: return null;
    }
};

// --- UTILITY FUNCTIONS ---
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

const updateNodeInTree = (nodes: RepoNode[], path: string, updatedNode: RepoNode): RepoNode[] => {
  return nodes.map(node => {
    if (node.path === path) return updatedNode;
    if (node.type === 'folder' && path.startsWith(node.path + (node.path === '/' ? '' : '/'))) {
      return { ...node, children: updateNodeInTree(node.children, path, updatedNode) };
    }
    return node;
  });
};

// --- SUB-COMPONENTS ---

interface FileNodeProps {
    node: File;
    onSelectFile: (path: string) => void;
    selectedFilePath: string | null;
    isModified: boolean;
    isStaged: boolean;
    level: number;
}

const FileNodeDisplay: React.FC<FileNodeProps> = ({ node, onSelectFile, selectedFilePath, isModified, isStaged, level }) => {
    const isSelected = selectedFilePath === node.path;
    const statusText = isStaged ? 'text-neon-green' : (isModified ? 'text-yellow-400' : '');
    const statusIndicator = isStaged 
        ? <span className="ml-auto text-xs text-neon-green font-bold" title="Staged">S</span>
        : isModified 
        ? <span className="ml-auto text-xs text-yellow-400 font-bold" title="Modified">M</span> 
        : null;

    return (
        <div onClick={() => onSelectFile(node.path)} className={`flex items-center cursor-pointer py-1 pr-2 rounded hover:bg-white/10 ${isSelected ? 'bg-neon-purple/20' : ''}`} style={{ paddingLeft: `${level * 1}rem` }}>
            <FileIcon />
            <span className={`text-sm truncate ${statusText}`}>{node.name}</span>
            {statusIndicator}
        </div>
    );
};

const FileExplorer: React.FC<{ structure: Folder; onSelectFile: (path: string) => void; selectedFilePath: string | null; modifiedFiles: Map<string, string>; stagedFiles: Set<string>; onNewFile: () => void }> = ({ structure, onSelectFile, selectedFilePath, modifiedFiles, stagedFiles, onNewFile }) => {
    const renderNode = (node: RepoNode, level: number) => {
        if (node.type === 'folder') {
            return <FolderNodeDisplay key={node.path} node={node} level={level} />;
        }
        return <FileNodeDisplay key={node.path} node={node} onSelectFile={onSelectFile} selectedFilePath={selectedFilePath} isModified={modifiedFiles.has(node.path)} isStaged={stagedFiles.has(node.path)} level={level} />;
    };

    const FolderNodeDisplay: React.FC<{ node: Folder; level: number }> = ({ node, level }) => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div>
                <div onClick={() => setIsOpen(!isOpen)} className="flex items-center cursor-pointer py-1 px-2 rounded hover:bg-white/10" style={{ paddingLeft: `${level * 1}rem` }}>
                    <ChevronRight isOpen={isOpen} />
                    <FolderIcon isOpen={isOpen} />
                    <span className="text-sm">{node.name}</span>
                </div>
                {isOpen && <div>{node.children.map(child => renderNode(child, level + 1))}</div>}
            </div>
        );
    };

    return (
        <div className="w-64 flex-shrink-0 bg-brand-panel/50 border-r border-brand-border p-2 flex flex-col">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-brand-border">
                <h3 className="font-bold text-sm">main</h3>
                <button onClick={onNewFile} className="p-1 rounded hover:bg-white/10 text-brand-text-muted hover:text-brand-text" title="New File"><NewFileIcon /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {structure.children.map(node => renderNode(node, 0))}
            </div>
        </div>
    );
};

const EditorPanel: React.FC<{ file: File | null; content: string; onContentChange: (newContent: string) => void; }> = ({ file, content, onContentChange }) => {
    if (!file) {
        return <div className="flex-1 flex items-center justify-center text-brand-text-muted">Select a file to view its content</div>;
    }

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <div className="p-2 border-b border-brand-border text-sm text-brand-text-muted bg-brand-panel/50">
                {file.path}
            </div>
            <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                className="flex-1 bg-brand-dark p-4 font-fira-code text-sm resize-none focus:outline-none w-full h-full"
                spellCheck="false"
            />
        </div>
    );
};

const ActionsPanel: React.FC<{
    modifiedFiles: Map<string, string>;
    stagedFiles: Set<string>;
    onStageFile: (path: string) => void;
    onUnstageFile: (path: string) => void;
    onStageAll: () => void;
    onUnstageAll: () => void;
    onCommit: (message: string) => void;
    onTemplateChange: (templateId: string) => void;
    onCommandRun: (command: AgentCommand) => void;
    onShowToast: (message: string) => void;
    apiName: string;
    onApiNameChange: (value: string) => void;
    apiKey: string;
    onApiKeyChange: (value: string) => void;
    onSetEnvVars: () => void;
}> = ({ modifiedFiles, stagedFiles, onStageFile, onUnstageFile, onStageAll, onUnstageAll, onCommit, onTemplateChange, onCommandRun, onShowToast, apiName, onApiNameChange, apiKey, onApiKeyChange, onSetEnvVars }) => {
    const [commitMessage, setCommitMessage] = useState('');
    
    const unstagedChanges = Array.from(modifiedFiles.keys()).filter(path => !stagedFiles.has(path));
    const stagedChangesArray = Array.from(stagedFiles);

    const handleCommit = () => {
        if (commitMessage.trim() && stagedFiles.size > 0) {
            onCommit(commitMessage);
            setCommitMessage('');
        }
    };
    
    return (
        <div className="w-80 flex-shrink-0 bg-brand-panel/50 border-l border-brand-border p-4 overflow-y-auto text-sm">
             {/* Source Control */}
            <div className="mb-6">
                <h3 className="font-bold mb-2">Source Control</h3>
                
                {/* Changes */}
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-xs text-brand-text-muted">Changes ({unstagedChanges.length})</h4>
                        <button onClick={onStageAll} disabled={unstagedChanges.length === 0} className="p-1 rounded hover:bg-white/10 disabled:opacity-50" title="Stage All Changes">
                            <StageIcon/>
                        </button>
                    </div>
                    <div className="max-h-24 overflow-y-auto text-xs space-y-1 p-1 bg-brand-dark/30 rounded">
                        {unstagedChanges.length > 0 
                            ? unstagedChanges.map(path => (
                                <div key={path} className="group flex items-center justify-between truncate p-1 bg-yellow-400/10 text-yellow-400 rounded hover:bg-yellow-400/20">
                                    <span className="truncate" title={path}>{path.substring(1)}</span>
                                    <button onClick={() => onStageFile(path)} className="opacity-0 group-hover:opacity-100 text-yellow-200 hover:text-white flex-shrink-0 ml-2" title="Stage File">
                                        <StageIcon/>
                                    </button>
                                </div>
                            ))
                            : <div className="text-brand-text-muted text-center p-1">No unstaged changes</div>
                        }
                    </div>
                </div>
                
                {/* Staged Changes */}
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-xs text-brand-text-muted">Staged Changes ({stagedChangesArray.length})</h4>
                         <button onClick={onUnstageAll} disabled={stagedChangesArray.length === 0} className="p-1 rounded hover:bg-white/10 disabled:opacity-50" title="Unstage All Changes">
                            <UnstageIcon />
                        </button>
                    </div>
                    <div className="max-h-24 overflow-y-auto text-xs space-y-1 p-1 bg-brand-dark/30 rounded">
                        {stagedChangesArray.length > 0 
                            ? stagedChangesArray.map(path => (
                                <div key={path} className="group flex items-center justify-between truncate p-1 bg-neon-green/10 text-neon-green rounded hover:bg-neon-green/20">
                                    <span className="truncate" title={path}>{path.substring(1)}</span>
                                    <button onClick={() => onUnstageFile(path)} className="opacity-0 group-hover:opacity-100 text-green-200 hover:text-white flex-shrink-0 ml-2" title="Unstage File">
                                        <UnstageIcon />
                                    </button>
                                </div>
                            ))
                            : <div className="text-brand-text-muted text-center p-1">No staged changes</div>
                        }
                    </div>
                </div>

                <textarea
                    placeholder="Commit message"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-border rounded-md p-2 h-20 text-xs focus:ring-neon-purple focus:border-neon-purple mt-2"
                />
                <button
                    onClick={handleCommit}
                    disabled={!commitMessage.trim() || stagedFiles.size === 0}
                    className="w-full bg-neon-green/80 text-black font-bold py-2 rounded-md mt-2 hover:bg-neon-green disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                   <CommitIcon /> <span className="ml-2">Commit ({stagedChangesArray.length})</span>
                </button>
            </div>
            {/* Templates */}
            <div className="mb-6">
                 <h3 className="font-bold mb-2">Project Templates</h3>
                 <select
                    onChange={(e) => onTemplateChange(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-border rounded-lg p-2 text-xs focus:ring-neon-purple focus:border-neon-purple mb-2"
                 >
                    <option value="">Select a template...</option>
                    {PROJECT_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                 </select>
                 <div className="flex gap-2">
                    <button onClick={() => onShowToast('Upload functionality coming soon!')} className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-2 rounded-md text-xs"><UploadIcon /> Upload</button>
                    <button onClick={() => onShowToast('Download functionality coming soon!')} className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-2 rounded-md text-xs"><DownloadIcon /> Download</button>
                 </div>
            </div>
            {/* Container Environment */}
            <div className="mb-6">
                 <h3 className="font-bold mb-2">Container Environment</h3>
                 <div className="space-y-2">
                     <div>
                         <label htmlFor="api-name" className="block text-xs font-medium text-brand-text-muted mb-1">API_NAME</label>
                         <input
                             type="text"
                             id="api-name"
                             value={apiName}
                             onChange={(e) => onApiNameChange(e.target.value)}
                             placeholder="e.g., GEMINI_API_KEY"
                             className="w-full bg-brand-dark/50 border border-brand-border rounded-md p-2 text-xs focus:ring-neon-purple focus:border-neon-purple"
                         />
                     </div>
                     <div>
                         <label htmlFor="api-key" className="block text-xs font-medium text-brand-text-muted mb-1">API_KEY</label>
                         <input
                             type="password"
                             id="api-key"
                             value={apiKey}
                             onChange={(e) => onApiKeyChange(e.target.value)}
                             placeholder="Enter your secret key"
                             className="w-full bg-brand-dark/50 border border-brand-border rounded-md p-2 text-xs focus:ring-neon-purple focus:border-neon-purple"
                         />
                     </div>
                 </div>
                 <button
                    onClick={onSetEnvVars}
                    disabled={!apiName.trim() || !apiKey.trim()}
                    className="w-full bg-neon-blue/80 text-black font-bold py-2 rounded-md mt-2 hover:bg-neon-blue disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                   Set Variables
                </button>
            </div>
            {/* Agent Commands */}
            <div>
                 <h3 className="font-bold mb-2">Agent Commands</h3>
                 <div className="space-y-1">
                    {AGENT_COMMANDS.map(cmd => (
                        <div key={cmd.name} onClick={() => onCommandRun(cmd)} title={cmd.description} className="p-2 rounded-md hover:bg-white/10 cursor-pointer flex items-center">
                            <TargetIcon target={cmd.target} />
                            <div className="flex-1">
                                <p className="font-semibold text-xs">{cmd.name}</p>
                                <p className="text-xs text-brand-text-muted truncate">{cmd.command}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const RepositoryPage: React.FC = () => {
    const [structure, setStructure] = useState<Folder>(INITIAL_REPO_STRUCTURE);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const [modifiedFiles, setModifiedFiles] = useState<Map<string, string>>(new Map());
    const [stagedFiles, setStagedFiles] = useState<Set<string>>(new Set());
    const [toastInfo, setToastInfo] = useState<{show: boolean; message: string}>({show: false, message: ''});
    const [apiName, setApiName] = useState('');
    const [apiKey, setApiKey] = useState('');
    
    const showToast = (message: string) => {
        setToastInfo({ show: true, message });
        setTimeout(() => setToastInfo({ show: false, message: '' }), 3000);
    };

    const handleSelectFile = useCallback((path: string) => {
        const node = findNodeByPath([structure], path);
        if (node && node.type === 'file') {
            setSelectedFile(node);
            setEditorContent(modifiedFiles.get(path) ?? node.content);
        }
    }, [structure, modifiedFiles]);
    
    const handleContentChange = (newContent: string) => {
        if (!selectedFile) return;
        setEditorContent(newContent);

        setModifiedFiles(prevMap => {
            const newMap = new Map(prevMap);
            // Get original content from structure to compare
            const originalNode = findNodeByPath([structure], selectedFile.path);
            const originalContent = (originalNode && originalNode.type === 'file') ? originalNode.content : '';

            if (originalContent !== newContent) {
                newMap.set(selectedFile.path, newContent);
            } else {
                newMap.delete(selectedFile.path);
            }
            return newMap;
        });
    };
    
    const handleStageFile = (path: string) => {
        setStagedFiles(prev => new Set(prev).add(path));
    };

    const handleUnstageFile = (path: string) => {
        setStagedFiles(prev => {
            const newSet = new Set(prev);
            newSet.delete(path);
            return newSet;
        });
    };

    const handleStageAll = () => {
        const unstagedPaths = Array.from(modifiedFiles.keys()).filter(path => !stagedFiles.has(path));
        setStagedFiles(prev => new Set([...prev, ...unstagedPaths]));
    };

    const handleUnstageAll = () => {
        setStagedFiles(new Set());
    };

    const handleCommit = (message: string) => {
        if (stagedFiles.size === 0) {
            showToast("No changes staged for commit.");
            return;
        }

        let currentStructure = structure;
        const committedPaths = new Set(stagedFiles);

        stagedFiles.forEach(path => {
            const content = modifiedFiles.get(path);
            if (content === undefined) return;

            const nodeToUpdate = findNodeByPath([currentStructure], path);
            if (nodeToUpdate && nodeToUpdate.type === 'file') {
                const updatedNode: File = { ...nodeToUpdate, content };
                const newChildren = updateNodeInTree(currentStructure.children, path, updatedNode);
                currentStructure = { ...currentStructure, children: newChildren };
            }
        });

        setStructure(currentStructure);
        
        setModifiedFiles(prevMap => {
            const newMap = new Map(prevMap);
            committedPaths.forEach(path => newMap.delete(path));
            return newMap;
        });
        setStagedFiles(new Set());

        if (selectedFile && committedPaths.has(selectedFile.path)) {
            const freshNode = findNodeByPath([currentStructure], selectedFile.path);
            if(freshNode && freshNode.type === 'file') {
                setSelectedFile(freshNode);
                setEditorContent(freshNode.content);
            }
        }
        
        showToast(`Commit successful: ${message}`);
    };
    
    const handleTemplateChange = (templateId: string) => {
        const template = PROJECT_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setStructure(template.structure);
            setSelectedFile(null);
            setEditorContent('');
            setModifiedFiles(new Map());
            setStagedFiles(new Set());
            showToast(`Template "${template.name}" loaded.`);
        }
    };
    
    const handleNewFile = () => {
        const fileName = prompt("Enter new file name (e.g., components/Button.tsx):");
        if (!fileName) return;

        const path = `/${fileName}`;
        const newFile: File = { type: 'file', name: fileName.split('/').pop() || 'new-file.js', path, content: '' };
        
        // This is a simplified way to add a file. A real implementation would parse the path.
        const newStructure = { ...structure, children: [...structure.children, newFile] };
        setStructure(newStructure);
        showToast(`File created: ${fileName}`);
    };

    const handleSetEnvVars = () => {
        if (apiName.trim() && apiKey.trim()) {
            showToast('Environment variables set for the container.');
        }
    };

    return (
        <div className="flex h-full bg-brand-dark text-brand-text">
            {toastInfo.show && <div className="fixed bottom-5 right-5 bg-neon-green text-black font-semibold py-2 px-4 rounded-lg shadow-lg z-50">{toastInfo.message}</div>}
            <FileExplorer 
                structure={structure} 
                onSelectFile={handleSelectFile} 
                selectedFilePath={selectedFile?.path || null} 
                modifiedFiles={modifiedFiles}
                stagedFiles={stagedFiles}
                onNewFile={handleNewFile}
            />
            <EditorPanel file={selectedFile} content={editorContent} onContentChange={handleContentChange} />
            <ActionsPanel 
                modifiedFiles={modifiedFiles}
                stagedFiles={stagedFiles} 
                onStageFile={handleStageFile}
                onUnstageFile={handleUnstageFile}
                onStageAll={handleStageAll}
                onUnstageAll={handleUnstageAll}
                onCommit={handleCommit} 
                onTemplateChange={handleTemplateChange}
                onCommandRun={(cmd) => showToast(`Running: ${cmd.command}`)}
                onShowToast={showToast}
                apiName={apiName}
                onApiNameChange={setApiName}
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                onSetEnvVars={handleSetEnvVars}
            />
        </div>
    );
};

export default RepositoryPage;