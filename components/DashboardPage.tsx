
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CONVERSATIONS, MODEL_USAGE_DATA, TOPICS } from '../constants';
import { Topic, Conversation } from '../types';

interface CardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
}

const DashboardCard: React.FC<CardProps> = ({ title, value, change, changeType = 'neutral', icon }) => {
    const changeColor = changeType === 'positive' ? 'text-neon-green' : changeType === 'negative' ? 'text-neon-pink' : 'text-brand-text-muted';
    return (
        <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-5 rounded-lg shadow-lg hover:border-neon-blue/50 transition-all duration-300">
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-brand-text-muted">{title}</h3>
                <div className="text-brand-text-muted">{icon}</div>
            </div>
            <p className="text-3xl font-bold mt-2 text-brand-text">{value}</p>
            {change && <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>}
        </div>
    );
};

const ModelUsageChart: React.FC = () => (
    <div className="lg:col-span-2 bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-brand-text">Model Usage (Last 30 Days)</h3>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MODEL_USAGE_DATA.datasets[0].data.map((_, i) => ({
                    name: MODEL_USAGE_DATA.labels[i],
                    ...MODEL_USAGE_DATA.datasets.reduce((acc, ds) => ({ ...acc, [ds.name]: ds.data[i] }), {})
                }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 13, 13, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#e5e7eb', backdropFilter: 'blur(4px)' }} />
                    <Legend wrapperStyle={{ color: '#9ca3af' }}/>
                    {MODEL_USAGE_DATA.datasets.map(ds => (
                        <Line key={ds.name} type="monotone" dataKey={ds.name} stroke={ds.stroke} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6, style: { stroke: ds.stroke, filter: `drop-shadow(0 0 5px ${ds.stroke})` } }} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const TopicsOverview: React.FC = () => (
    <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-brand-text">Topics Overview</h3>
        <div className="space-y-4">
            {TOPICS.map((topic: Topic) => (
                <div key={topic.name}>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-brand-text">{topic.name}</span>
                        <span className="text-sm font-medium text-brand-text-muted">{topic.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                        <div className={`${topic.class} h-2.5 rounded-full`} style={{ width: `${topic.percentage}%`, filter: `drop-shadow(0 0 4px ${topic.color})` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RecentConversationsTable: React.FC = () => (
    <div className="lg:col-span-3 bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-brand-text">Recent Conversations</h3>
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
                    {CONVERSATIONS.slice(0, 5).map((convo: Conversation) => (
                        <tr key={convo.id} className="border-b border-brand-border hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">{convo.user}</td>
                            <td className="px-6 py-4">{convo.model}</td>
                            <td className="px-6 py-4">{convo.topic}</td>
                            <td className="px-6 py-4">{convo.timestamp}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${convo.status === 'Active' ? 'bg-neon-green/10 text-neon-green' : convo.status === 'Pending' ? 'bg-neon-pink/10 text-neon-pink' : 'bg-gray-500/10 text-gray-400'}`}>
                                    {convo.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <DashboardCard title="Total Conversations" value="12,540" change="+15.2% from last month" changeType="positive" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
                <DashboardCard title="Active Models" value="24" change="+2 since last week" changeType="neutral" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 2v2"/><path d="M9 2v2"/></svg>} />
                <DashboardCard title="Avg. Response Time" value="1.2s" change="-0.3s from last month" changeType="positive" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>} />
                <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-5 rounded-lg shadow-lg">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-brand-text-muted">System Status</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-brand-text-muted"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                        </span>
                        <p className="text-xl font-bold text-brand-text ml-2">Operational</p>
                    </div>
                    <p className="text-xs text-brand-text-muted mt-1">All systems are running smoothly.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ModelUsageChart />
                <TopicsOverview />
                <RecentConversationsTable />
            </div>
        </div>
    );
};

export default DashboardPage;