
import React from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import ConsolePage from './components/ConsolePage';
import ConversationsPage from './components/ConversationsPage';
import AIFamilyPage from './components/AIFamilyPage';
import AnalyticsPage from './components/AnalyticsPage';
import AdminPage from './components/AdminPage';
import SettingsPage from './components/SettingsPage';
import OrchestrationPage from './components/OrchestrationPage';
import LandingPage from './components/LandingPage';
import RepositoryPage from './components/RepositoryPage'; // Import RepositoryPage
import {
    LogoIcon,
    DashboardIcon,
    ConsoleIcon,
    ConversationsIcon,
    AIFamilyIcon,
    AnalyticsIcon,
    AdminIcon,
    SettingsIcon,
    AlertTriangleIcon,
    BellIcon,
    OrchestrationIcon,
    RepositoryIcon, // Import RepositoryIcon
} from './constants';

// Updated navItems with /app prefix
const navItems = [
    { href: '/app', text: 'Dashboard', icon: <DashboardIcon /> },
    { href: '/app/console', text: 'Console', icon: <ConsoleIcon /> },
    { href: '/app/conversations', text: 'Conversations', icon: <ConversationsIcon /> },
    { href: '/app/ai-family', text: 'AI Family', icon: <AIFamilyIcon /> },
    { href: '/app/repository', text: 'Repository', icon: <RepositoryIcon /> },
    { href: '/app/orchestration', text: 'Orchestration', icon: <OrchestrationIcon /> },
    { href: '/app/analytics', text: 'Analytics', icon: <AnalyticsIcon /> },
    { href: '/app/admin', text: 'Admin', icon: <AdminIcon /> },
];

const Sidebar: React.FC = () => (
    <aside className="w-64 flex-shrink-0 bg-brand-panel backdrop-blur-md border-r border-brand-border flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-brand-border">
            <div className="flex items-center space-x-2">
                <LogoIcon />
                <h1 className="text-xl font-bold text-brand-text">C0dexai</h1>
            </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
                <NavLink
                    key={item.href}
                    to={item.href}
                    // 'end' prop ensures the NavLink is only active for the exact route.
                    // Crucial for the Dashboard link not staying active on other pages.
                    end={item.href === '/app'}
                    className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-sm font-medium rounded-md text-brand-text-muted hover:bg-white/10 ${
                            isActive ? 'bg-white/10 text-neon-purple shadow-[0_0_10px_-2px] shadow-neon-purple' : ''
                        }`
                    }
                >
                    {item.icon}
                    {item.text}
                </NavLink>
            ))}
        </nav>
        <div className="mt-auto p-4 border-t border-brand-border">
            <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md text-brand-text-muted hover:bg-white/10 ${
                        isActive ? 'bg-white/10 text-neon-purple shadow-[0_0_10px_-2px] shadow-neon-purple' : ''
                    }`
                }
            >
                <SettingsIcon />
                Settings
            </NavLink>
        </div>
    </aside>
);

const Header: React.FC = () => {
    const location = useLocation();
    // Adjust route name parsing for /app prefix
    const pathSlice = location.pathname.startsWith('/app') ? location.pathname.substring('/app'.length) : location.pathname;
    const routeName = pathSlice.replace(/^\//, '').replace('-', ' ') || 'dashboard';
    const pageTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);
    
    const pageSubtitles: { [key: string]: string } = {
        'dashboard': "Welcome back, here's a summary of your development projects.",
        'console': "Interact with the C0dex Web Dev AI directly.",
        'conversations': "Review and manage all coding assistance conversations.",
        'ai family': "Manage your specialized code generation models.",
        'repository': "Manage your project repository with an integrated file system and AI agent.",
        'orchestration': "Synchronize components and dependencies across repositories.",
        'analytics': "Detailed analytics of your build times and code quality.",
        'admin': "Platform administration and developer team management.",
        'settings': "Manage your account and development environment settings."
    };

    return (
         <header className="h-16 flex items-center justify-between px-6 bg-brand-panel backdrop-blur-md border-b border-brand-border flex-shrink-0">
            <div>
                <h1 className="text-2xl font-semibold text-brand-text">{pageTitle}</h1>
                <p className="text-sm text-brand-text-muted">{pageSubtitles[routeName.toLowerCase()]}</p>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full text-brand-text-muted hover:bg-white/10 hover:text-neon-pink transition-colors">
                    <AlertTriangleIcon />
                </button>
                <button className="p-2 rounded-full text-brand-text-muted hover:bg-white/10 hover:text-neon-pink transition-colors">
                    <BellIcon />
                </button>
                <div className="flex items-center space-x-2">
                    <img className="h-9 w-9 rounded-full border-2 border-neon-blue/50" src="https://picsum.photos/36" alt="User avatar" />
                    <div>
                        <p className="text-sm font-medium text-brand-text">Admin User</p>
                        <p className="text-xs text-brand-text-muted">admin@c0dex.ai</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

// New component to encapsulate the main dashboard layout
const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-brand-dark text-brand-text font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto bg-brand-dark">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/console" element={<ConsolePage />} />
                        <Route path="/conversations" element={<ConversationsPage />} />
                        <Route path="/ai-family" element={<AIFamilyPage />} />
                        <Route path="/repository" element={<RepositoryPage />} />
                        <Route path="/orchestration" element={<OrchestrationPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    React.useEffect(() => {
        document.body.className = 'bg-brand-dark text-brand-text font-sans';
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app/*" element={<DashboardLayout />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
