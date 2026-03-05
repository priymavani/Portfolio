'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', icon: '🏠', href: '/edit/priy/portfolio/dashboard' },
        { name: 'Projects', icon: '📁', href: '/edit/priy/portfolio/dashboard/projects' },
        { name: 'Skills', icon: '⚡', href: '/edit/priy/portfolio/dashboard/skills' },
        { name: 'Experience', icon: '💼', href: '/edit/priy/portfolio/dashboard/experience' },
        { name: 'Certificates', icon: '🏆', href: '/edit/priy/portfolio/dashboard/certificates' },
        { name: 'Hackathons', icon: '🚀', href: '/edit/priy/portfolio/dashboard/hackathons' },
        { name: 'Profile', icon: '👤', href: '/edit/priy/portfolio/dashboard/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
                {/* Logo */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && <h2 className="text-white font-bold text-xl">Admin</h2>}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-400 hover:text-white"
                        >
                            {sidebarOpen ? '◀' : '▶'}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
                        >
                            <span className="text-xl">{item.icon}</span>
                            {sidebarOpen && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-gray-700">
                    {sidebarOpen ? (
                        <div className="space-y-2">
                            <p className="text-white text-sm font-medium">{user?.name}</p>
                            <button
                                onClick={logout}
                                className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={logout}
                            className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                            title="Logout"
                        >
                            🚪
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
