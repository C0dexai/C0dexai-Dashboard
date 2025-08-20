
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MODELS } from '../constants';
import { Model } from '../types';

interface ToastState {
    show: boolean;
    message: string;
}

const Toast: React.FC<{ message: string; onDismiss: () => void; }> = ({ message, onDismiss }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed bottom-5 right-5 bg-neon-green text-black font-semibold py-2 px-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
            {message}
        </div>
    );
};

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div 
            id="modal-overlay" 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                id="modal-container" 
                className="bg-brand-dark/80 backdrop-blur-md border border-neon-purple/50 rounded-lg shadow-lg shadow-neon-purple/20 w-full max-w-md" 
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

interface ModelCardProps {
    model: Model;
    onViewDetails: (type: 'details' | 'configure', id: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onViewDetails }) => {
    const statusColor = model.status === 'Active' 
        ? 'bg-neon-green/10 text-neon-green' 
        : model.status === 'Inactive' ? 'bg-gray-500/10 text-gray-400'
        : 'bg-neon-blue/10 text-neon-blue';

    return (
        <div className="bg-brand-panel backdrop-blur-sm border border-brand-border p-6 rounded-lg shadow-lg flex flex-col hover:border-neon-purple/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-brand-text">{model.name}</h3>
                <span className={`${statusColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>{model.status}</span>
            </div>
            <p className="text-sm text-brand-text-muted mb-4">Version: {model.version}</p>
            <div className="flex-grow">
                <div className="flex justify-between text-sm mb-2 text-brand-text-muted"><span>Usage (30d):</span><span className="font-medium text-brand-text">{model.usage.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-brand-text-muted"><span>Avg. Response:</span><span className="font-medium text-brand-text">{model.avgResponse}s</span></div>
            </div>
            <div className="mt-4 flex space-x-2">
                <button onClick={() => onViewDetails('details', model.id)} className="w-full bg-neon-purple/80 text-white py-2 rounded-lg hover:bg-neon-purple text-sm font-semibold transition-colors">View Details</button>
                <button onClick={() => onViewDetails('configure', model.id)} className="w-full bg-white/10 text-brand-text py-2 rounded-lg hover:bg-white/20 text-sm transition-colors">Configure</button>
            </div>
        </div>
    );
};

const AIFamilyPage: React.FC = () => {
    const [modalState, setModalState] = useState<{ isOpen: boolean; type?: 'details' | 'configure'; modelId?: string }>({ isOpen: false });
    const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

    const showToast = (message: string) => setToast({ show: true, message });

    const handleOpenModal = (type: 'details' | 'configure', modelId: string) => {
        setModalState({ isOpen: true, type, modelId });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false });
    };

    const selectedModel = MODELS.find(m => m.id === modalState.modelId);
    
    const singleModelChartData = [
        { name: 'Week 1', usage: 1200 }, { name: 'Week 2', usage: 1900 }, { name: 'Week 3', usage: 3000 }, { name: 'Week 4', usage: 5000 }
    ];

    return (
        <div className="p-6">
            {toast.show && <Toast message={toast.message} onDismiss={() => setToast({ show: false, message: '' })} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODELS.map(model => (
                    <ModelCard key={model.id} model={model} onViewDetails={handleOpenModal} />
                ))}
            </div>

            {modalState.isOpen && selectedModel && (
                <Modal onClose={handleCloseModal}>
                    {modalState.type === 'details' && (
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-brand-text">{selectedModel.name} Details</h3>
                            <p className="text-sm text-brand-text-muted mb-4">{selectedModel.description}</p>
                            <div className="h-48 mt-4">
                               <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={singleModelChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                                        <YAxis tick={{ fill: '#94a3b8' }} />
                                        <Tooltip cursor={{fill: 'rgba(160, 32, 240, 0.2)'}} contentStyle={{ backgroundColor: 'rgba(13, 13, 13, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)' }} />
                                        <Bar dataKey="usage" fill="#A020F0" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-brand-text">Close</button>
                            </div>
                        </div>
                    )}
                    {modalState.type === 'configure' && (
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-brand-text">Configure {selectedModel.name}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleCloseModal(); showToast('Configuration saved!'); }}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-brand-text-muted mb-1">Status</label>
                                    <select defaultValue={selectedModel.status} className="w-full bg-brand-dark/50 border border-brand-border rounded-lg p-2 text-brand-text focus:ring-neon-purple focus:border-neon-purple">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                        <option>In-Training</option>
                                    </select>
                                </div>
                                 <div className="mb-4">
                                    <label className="block text-sm font-medium text-brand-text-muted mb-1">Preferred Framework</label>
                                    <select className="w-full bg-brand-dark/50 border border-brand-border rounded-lg p-2 text-brand-text focus:ring-neon-purple focus:border-neon-purple">
                                        <option>React</option>
                                        <option>Vue</option>
                                        <option>Node.js</option>
                                        <option>Vanilla JS</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-brand-text-muted mb-1">Code Style</label>
                                    <select className="w-full bg-brand-dark/50 border border-brand-border rounded-lg p-2 text-brand-text focus:ring-neon-purple focus:border-neon-purple">
                                        <option>Standard (ESLint)</option>
                                        <option>Airbnb</option>
                                        <option>Google</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-brand-text-muted mb-1">Creativity (Temperature)</label>
                                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple" />
                                </div>
                                <div className="flex justify-end space-x-2 mt-6">
                                    <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-brand-text">Cancel</button>
                                    <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default AIFamilyPage;