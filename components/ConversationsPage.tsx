
import React, { useState } from 'react';
import { CONVERSATIONS, MODELS } from '../constants';
import { Conversation } from '../types';

const ConversationsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modelFilter, setModelFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredConversations = CONVERSATIONS
        .filter(c => searchTerm === '' || c.user.toLowerCase().includes(searchTerm.toLowerCase()) || (c.topic && c.topic.toLowerCase().includes(searchTerm.toLowerCase())))
        .filter(c => modelFilter === 'all' || c.model.replace(/\s/g, '-').toLowerCase() === modelFilter)
        .filter(c => statusFilter === 'all' || c.status.toLowerCase() === statusFilter);

    const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
    const paginatedConversations = filteredConversations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStatusBadge = (status: 'Active' | 'Closed' | 'Pending') => {
        switch (status) {
            case 'Active': return 'bg-neon-green/10 text-neon-green';
            case 'Closed': return 'bg-gray-500/10 text-gray-400';
            case 'Pending': return 'bg-neon-pink/10 text-neon-pink';
        }
    };
    
    return (
        <div className="p-6">
            <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by user or topic..."
                        className="flex-grow bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-2 text-sm focus:ring-neon-purple focus:border-neon-purple text-brand-text placeholder-brand-text-muted"
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                    <select
                        className="bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-2 text-sm focus:ring-neon-purple focus:border-neon-purple text-brand-text"
                        onChange={(e) => { setModelFilter(e.target.value); setCurrentPage(1); }}
                        value={modelFilter}
                    >
                        <option value="all">Filter by Model</option>
                        {MODELS.map(m => <option key={m.id} value={m.name.replace(/\s/g, '-').toLowerCase()}>{m.name}</option>)}
                    </select>
                    <select
                        className="bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-2 text-sm focus:ring-neon-purple focus:border-neon-purple text-brand-text"
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        value={statusFilter}
                    >
                        <option value="all">Filter by Status</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-text-muted">
                        <thead className="text-xs uppercase bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-3">User</th>
                                <th scope="col" className="px-6 py-3">Model Used</th>
                                <th scope="col" className="px-6 py-3">Topic</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedConversations.map((convo: Conversation) => (
                                <tr key={convo.id} className="border-b border-brand-border hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">{convo.user}</td>
                                    <td className="px-6 py-4">{convo.model}</td>
                                    <td className="px-6 py-4">{convo.topic}</td>
                                    <td className="px-6 py-4">{convo.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${getStatusBadge(convo.status)}`}>
                                            {convo.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 text-sm text-brand-text-muted">
                    <span>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredConversations.length)} of {filteredConversations.length} entries</span>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-brand-border rounded-lg hover:bg-white/5 hover:border-neon-purple/50 disabled:opacity-30 disabled:cursor-not-allowed">Previous</button>
                        {[...Array(totalPages).keys()].map(n => (
                             <button key={n+1} onClick={() => setCurrentPage(n+1)} className={`px-3 py-1 border rounded-lg ${currentPage === n+1 ? 'bg-neon-purple text-black font-bold border-neon-purple' : 'border-brand-border hover:bg-white/5 hover:border-neon-purple/50'}`}>{n+1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-brand-border rounded-lg hover:bg-white/5 hover:border-neon-purple/50 disabled:opacity-30 disabled:cursor-not-allowed">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationsPage;