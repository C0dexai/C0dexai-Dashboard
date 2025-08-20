
import React, { useState } from 'react';

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

const SettingsPage: React.FC = () => {
    const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setToast({ show: true, message: 'Profile saved successfully!' });
    };

    return (
        <div className="p-6">
            {toast.show && <Toast message={toast.message} onDismiss={() => setToast({ show: false, message: '' })} />}
            <div className="bg-brand-panel backdrop-blur-sm border border-brand-border rounded-lg shadow-lg">
                <form onSubmit={handleSaveProfile}>
                    <div className="p-6">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-brand-text">Profile</h3>
                            <p className="mt-1 text-sm text-brand-text-muted">Update your personal information.</p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium text-brand-text-muted">Username</label>
                                <input type="text" name="username" id="username" defaultValue="Admin User" className="mt-1 block w-full rounded-md border-brand-border bg-brand-dark/50 shadow-sm sm:text-sm text-brand-text p-2 focus:ring-neon-purple focus:border-neon-purple" />
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-brand-text-muted">Email address</label>
                                <input type="email" name="email" id="email" defaultValue="admin@c0dex.ai" className="mt-1 block w-full rounded-md border-brand-border bg-brand-dark/50 shadow-sm sm:text-sm text-brand-text p-2 focus:ring-neon-purple focus:border-neon-purple" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/20 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neon-blue text-brand-dark text-base font-bold hover:bg-neon-blue/80 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors">Save</button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-brand-border shadow-sm px-4 py-2 bg-white/10 text-base font-medium text-brand-text hover:bg-white/20 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;