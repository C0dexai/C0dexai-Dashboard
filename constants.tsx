
import React from 'react';
import { Model, Conversation, Topic, Domain, SynchronizedDocument, AuditLogEntry, Folder, AgentCommand, ProjectTemplate } from './types';

// Icons
export const LogoIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
export const DashboardIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
export const ConsoleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>;
export const ConversationsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
export const AIFamilyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="M12 20.95V22c0 .55.45 1 1 1h.5c.28 0 .5-.22.5-.5v-1.1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5Z"/></svg>;
export const RepositoryIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M6 9v12"/></svg>;
export const OrchestrationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>;
export const AnalyticsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>;
export const AdminIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
export const SettingsIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
export const AlertTriangleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
export const BellIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;


// Mock Data
export const MODELS: Model[] = [
    { id: 'component-gen-v1', name: 'Component-Gen v1', version: '1.2-shadcn', status: 'Active', usage: 6200, avgResponse: 0.8, description: 'Specialized in generating React & Vue components with Shadcn UI and Tailwind CSS.' },
    { id: 'node-api-pro', name: 'Node-API Pro', version: '3.1-express', status: 'Active', usage: 12100, avgResponse: 1.2, description: 'Optimized for scaffolding secure and scalable Node.js REST APIs with Express and Prisma.' },
    { id: 'vanilla-master', name: 'Vanilla Master', version: 'es2023-vite', status: 'Inactive', usage: 8700, avgResponse: 1.5, description: 'A lightweight model for high-performance, dependency-free Vanilla JS and DOM manipulation.' },
];

export const CONVERSATIONS: Conversation[] = [
    { id: '1', user: 'dev1@example.com', model: 'Component-Gen v1', topic: 'React Component Bug', timestamp: '2 min ago', status: 'Active' },
    { id: '2', user: 'dev2@example.com', model: 'Node-API Pro', topic: 'API Rate Limiting', timestamp: '15 min ago', status: 'Closed' },
    { id: '3', user: 'dev3@example.com', model: 'Component-Gen v1', topic: 'Vue Router Issue', timestamp: '1 hour ago', status: 'Closed' },
    { id: '4', user: 'dev4@example.com', model: 'Node-API Pro', topic: 'Database Schema Design', timestamp: '3 hours ago', status: 'Pending' },
    { id: '5', user: 'dev5@example.com', model: 'Vanilla Master', topic: 'DOM Performance', timestamp: '5 hours ago', status: 'Closed' },
    { id: '6', user: 'dev6@example.com', model: 'Component-Gen v1', topic: 'Shadcn UI Customization', timestamp: '1 day ago', status: 'Closed' },
    { id: '7', user: 'dev7@example.com', model: 'Node-API Pro', topic: 'Authentication Middleware', timestamp: '1 day ago', status: 'Closed' },
    { id: '8', user: 'dev8@example.com', model: 'Component-Gen v1', topic: 'Vite HMR Problem', timestamp: '2 days ago', status: 'Active' },
    { id: '9', user: 'dev9@example.com', model: 'Vanilla Master', topic: 'Event Listener Memory Leak', timestamp: '2 days ago', status: 'Closed' },
    { id: '10', user: 'dev10@example.com', model: 'Node-API Pro', topic: 'CORS Configuration', timestamp: '3 days ago', status: 'Pending' },
    { id: '11', user: 'dev11@example.com', model: 'Component-Gen v1', topic: 'Vue State Management', timestamp: '4 days ago', status: 'Closed' },
];

export const TOPICS: Topic[] = [
  { name: 'React & Vue Components', percentage: 45, color: '#A020F0', class: 'bg-neon-purple' },
  { name: 'Node.js Backend', percentage: 25, color: '#00BFFF', class: 'bg-neon-blue' },
  { name: 'Vite & Build Tools', percentage: 18, color: '#39FF14', class: 'bg-neon-green' },
  { name: 'Vanilla JS & Perf', percentage: 12, color: '#FF00FF', class: 'bg-neon-pink' },
];

export const MODEL_USAGE_DATA = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
    datasets: [
        { name: 'Component-Gen v1', data: [1200, 1900, 3000, 5000], stroke: '#A020F0', fill: 'rgba(160, 32, 240, 0.1)' },
        { name: 'Node-API Pro', data: [1000, 1200, 2500, 4000], stroke: '#00BFFF', fill: 'rgba(0, 191, 255, 0.1)' },
        { name: 'Vanilla Master', data: [800, 900, 2200, 3100], stroke: '#39FF14', fill: 'rgba(57, 255, 20, 0.1)' }
    ]
};

// Mock Data for Orchestration Page
export const DOMAINS: Domain[] = [
    {
        id: 'domain-a',
        name: 'Frontend Monorepo (Turborepo)',
        agent: {
            name: 'ViteBot',
            status: 'Online',
            lastSync: '5 min ago',
            contextLedgerSize: 256,
        }
    },
    {
        id: 'domain-b',
        name: 'Backend Microservices (K8s)',
        agent: {
            name: 'NodeDaemon',
            status: 'Syncing',
            lastSync: '5 min ago',
            contextLedgerSize: 192,
        }
    }
];

export const SYNCHRONIZED_DOCUMENTS: SynchronizedDocument[] = [
    { id: '1', name: 'shared/ui/Button.tsx', version: '3.1.0', status: 'Synced', lastSynced: '5 min ago', sourceDomain: 'Domain A' },
    { id: '2', name: 'apps/web/package.json', version: '2.5.1', status: 'Pending Review', lastSynced: '1 hour ago', sourceDomain: 'Domain A' },
    { id: '3', name: 'services/auth/Dockerfile', version: '1.2.0', status: 'Conflict', lastSynced: '3 hours ago', sourceDomain: 'Domain B' },
    { id: '4', name: 'vite.config.ts', version: '4.0.0', status: 'Syncing', lastSynced: '1 min ago', sourceDomain: 'Domain A' },
    { id: '5', name: 'apps/docs/Login.vue', version: '2.0.0', status: 'Synced', lastSynced: '1 day ago', sourceDomain: 'Domain A' },
];

export const AUDIT_LOGS: AuditLogEntry[] = [
    { id: '1', timestamp: '1 min ago', agent: 'ViteBot', message: 'Initiated sync for "vite.config.ts".' },
    { id: '2', timestamp: '5 min ago', agent: 'ViteBot', message: 'Completed sync of "shared/ui/Button.tsx" to local dependents.' },
    { id: '3', timestamp: '15 min ago', agent: 'C0dex-AI', message: 'Detected dependency mismatch in "apps/web/package.json", flagged for review.' },
    { id: '4', timestamp: '3 hours ago', agent: 'System', message: 'Merge conflict detected in "services/auth/Dockerfile". Manual resolution required.' },
    { id: '5', timestamp: '4 hours ago', agent: 'NodeDaemon', message: 'Pushed updated schema for "services/auth".' },
];


// Data for Repository Page
export const AGENT_COMMANDS: AgentCommand[] = [
    { name: "Install Express", command: "/install express", description: "Installs the Express.js package", target: "container" },
    { name: "Analyze HTML", command: "/analyze index.html", description: "Runs code analysis on the main HTML file", target: "AI" },
    { name: "Start Dev Server", command: "/run \"npm run dev\"", description: "Starts the development server for preview", target: "container" },
    { name: "Push to GitHub", command: "/push", description: "Push current project to GitHub repo", target: "system" },
    { name: "Edit Readme", command: "/edit README.md \"Update project documentation\"", description: "Edit the README file directly", target: "container" },
    { name: "List Files", command: "/ls", description: "List all files in the container directory", target: "shell" },
    { name: "View Log", command: "/log \"Initial deployment complete.\"", description: "Record a custom message to system logs", target: "system" },
    { name: "Handoff to Lyra", command: "/handoff Lyra \"Review latest code changes\"", description: "Send a review task to the Lyra agent", target: "AI Family" }
];

const reactViteTemplate: Folder = {
  type: 'folder', name: 'react-vite-template', path: '/', children: [
    { type: 'folder', name: 'src', path: '/src', children: [
      { type: 'folder', name: 'components', path: '/src/components', children: [] },
      { type: 'file', name: 'App.tsx', path: '/src/App.tsx', content: `import React from 'react';\n\nfunction App() {\n  return <h1>Hello, Vite + React!</h1>;\n}\n\nexport default App;` },
      { type: 'file', name: 'index.css', path: '/src/index.css', content: `body { margin: 0; }` },
      { type: 'file', name: 'main.tsx', path: '/src/main.tsx', content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);` },
    ]},
    { type: 'file', name: 'index.html', path: '/index.html', content: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>` },
    { type: 'file', name: 'package.json', path: '/package.json', content: `{ "name": "react-vite-app", "private": true, "version": "0.0.0", "type": "module", "scripts": { "dev": "vite", "build": "tsc && vite build" } }` },
    { type: 'file', name: 'vite.config.ts', path: '/vite.config.ts', content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });` },
    { type: 'file', name: 'README.md', path: '/README.md', content: '# React + Vite Template' },
  ]
};

const nodeExpressTemplate: Folder = {
  type: 'folder', name: 'node-express-template', path: '/', children: [
    { type: 'folder', name: 'src', path: '/src', children: [
      { type: 'file', name: 'index.js', path: '/src/index.js', content: `const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(port, () => {\n  console.log(\`Example app listening on port \${port}\`);\n});` },
    ]},
    { type: 'file', name: 'package.json', path: '/package.json', content: `{ "name": "node-express-api", "version": "1.0.0", "main": "src/index.js", "scripts": { "start": "node src/index.js" }, "dependencies": { "express": "^4.18.2" } }` },
    { type: 'file', name: 'README.md', path: '/README.md', content: '# Node.js + Express API Template' },
  ]
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
    { id: 'react-vite', name: 'React + Vite', description: 'A basic frontend setup with React and Vite.', structure: reactViteTemplate },
    { id: 'node-express', name: 'Node.js Express API', description: 'A simple backend API using Node.js and Express.', structure: nodeExpressTemplate },
];

export const INITIAL_REPO_STRUCTURE: Folder = reactViteTemplate;
