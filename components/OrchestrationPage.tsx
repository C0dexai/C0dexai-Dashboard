
import React from 'react';
import { DOMAINS, SYNCHRONIZED_DOCUMENTS, AUDIT_LOGS, MODELS } from '../constants';
import { Domain, SynchronizedDocument, AuditLogEntry, Model } from '../types';

// Icons for status
const StatusIcon: React.FC<{ status: SynchronizedDocument['status'] }> = ({ status }) => {
    switch (status) {
        case 'Synced': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neon-green"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>;
        case 'Pending Review': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-yellow-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
        case 'Conflict': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neon-pink"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
        case 'Syncing': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neon-blue animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
        default: return null;
    }
};

const AgentStatusIndicator: React.FC<{ status: 'Online' | 'Syncing' | 'Offline' }> = ({ status }) => {
    const baseClasses = "relative flex h-3 w-3 mr-2";
    const pingClasses = "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75";
    const dotClasses = "relative inline-flex rounded-full h-3 w-3";

    switch (status) {
        case 'Online': return <span className={baseClasses}><span className={`${pingClasses} bg-neon-green`}></span><span className={`${dotClasses} bg-neon-green`}></span></span>;
        case 'Syncing': return <span className={baseClasses}><span className={`${pingClasses} bg-neon-blue`}></span><span className={`${dotClasses} bg-neon-blue`}></span></span>;
        case 'Offline': return <span className={baseClasses}><span className={`${dotClasses} bg-gray-500`}></span></span>;
        default: return null;
    }
}

const DomainCard: React.FC<{ domain: Domain }> = ({ domain }) => (
    <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg flex-1">
        <h3 className="text-lg font-semibold text-brand-text mb-2">{domain.name}</h3>
        <div className="border-t border-brand-border pt-4 mt-4">
            <p className="text-sm text-brand-text-muted mb-2">Designated Agent</p>
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-neon-purple">{domain.agent.name}</p>
                 <div className="flex items-center text-sm font-medium">
                    <AgentStatusIndicator status={domain.agent.status} />
                    {domain.agent.status}
                </div>
            </div>
            <div className="text-xs text-brand-text-muted mt-4 space-y-1">
                <p>Last Sync: {domain.agent.lastSync}</p>
                <p>Context Ledger: {domain.agent.contextLedgerSize} KB</p>
            </div>
        </div>
    </div>
);

const SupervisorCard: React.FC<{ model: Model }> = ({ model }) => (
     <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
        <h4 className="text-md font-semibold text-brand-text">{model.name}</h4>
        <p className="text-xs text-brand-text-muted mb-3">Supervisory Meta-Agent</p>
        <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
            </span>
            <p className="text-sm text-brand-text-muted ml-2">Status: Active</p>
        </div>
        <p className="text-xs text-brand-text-muted mt-2">Ensuring code quality and dependency consistency.</p>
    </div>
);


const KnowledgeBaseTable: React.FC = () => {
    const getStatusColor = (status: SynchronizedDocument['status']) => {
        switch (status) {
            case 'Synced': return 'bg-neon-green/10 text-neon-green';
            case 'Pending Review': return 'bg-yellow-400/10 text-yellow-400';
            case 'Conflict': return 'bg-neon-pink/10 text-neon-pink';
            case 'Syncing': return 'bg-neon-blue/10 text-neon-blue';
        }
    };
    
    return (
        <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-brand-text">Synchronized Knowledge Base</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-brand-text-muted">
                    <thead className="text-xs uppercase bg-white/5">
                        <tr>
                            <th scope="col" className="px-6 py-3">Document Name</th>
                            <th scope="col" className="px-6 py-3">Version</th>
                            <th scope="col" className="px-6 py-3">Last Synced</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SYNCHRONIZED_DOCUMENTS.map((doc: SynchronizedDocument) => (
                            <tr key={doc.id} className="border-b border-brand-border hover:bg-white/5">
                                <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">{doc.name}</td>
                                <td className="px-6 py-4">{doc.version}</td>
                                <td className="px-6 py-4">{doc.lastSynced}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${getStatusColor(doc.status)}`}>
                                        <StatusIcon status={doc.status}/>
                                        <span className="ml-1.5">{doc.status}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button className="text-neon-blue/80 hover:text-neon-blue text-xs font-semibold">History</button>
                                    <button className="text-neon-green/80 hover:text-neon-green text-xs font-semibold">Force Sync</button>
                                    {doc.status === 'Conflict' && <button className="text-neon-pink/80 hover:text-neon-pink text-xs font-semibold">Resolve</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AuditTrail: React.FC = () => (
    <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-brand-text">Live Status & Audit Trail</h3>
        <div className="space-y-3 font-fira-code text-xs max-h-80 overflow-y-auto">
            {AUDIT_LOGS.map(log => (
                <div key={log.id} className="flex items-start">
                    <span className="text-brand-text-muted mr-3 w-20 shrink-0">{log.timestamp}</span>
                    <span className="text-neon-purple mr-2 font-bold w-32 shrink-0">[{log.agent}]</span>
                    <span className="text-brand-text flex-1">{log.message}</span>
                </div>
            ))}
        </div>
    </div>
);


const OrchestrationPage: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-center gap-6">
                <DomainCard domain={DOMAINS[0]} />
                <div className="flex-shrink-0 text-brand-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor: '#A020F0', stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor: '#00BFFF', stopOpacity:1}} />
                        </linearGradient>
                      </defs>
                      <path d="M8 3L4 7l4 4" stroke="url(#grad1)" />
                      <path d="M4 7h10" stroke="url(#grad1)">
                        <animate attributeName="d" from="M4 7h0" to="M4 7h10" dur="0.5s" fill="freeze" />
                      </path>
                      <path d="m16 21 4-4-4-4" stroke="url(#grad1)" />
                      <path d="M20 17H10" stroke="url(#grad1)">
                        <animate attributeName="d" from="M20 17H20" to="M20 17H10" dur="0.5s" begin="0.5s" fill="freeze" />
                      </path>
                    </svg>
                </div>
                <DomainCard domain={DOMAINS[1]} />
            </div>

            <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg mb-4 text-brand-text">Supervisory Cross-Relational Intelligence</h3>
                <p className="text-sm text-brand-text-muted mb-4">Meta-agents provide oversight, arbitrate conflicts, and augment context for sophisticated inferences across repositories.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SupervisorCard model={MODELS.find(m => m.id === 'component-gen-v1')!} />
                    <SupervisorCard model={MODELS.find(m => m.id === 'node-api-pro')!} />
                </div>
            </div>

            <KnowledgeBaseTable />
            
            <AuditTrail />
        </div>
    );
};

export default OrchestrationPage;