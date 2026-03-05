'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        experiences: 0,
        certificates: 0,
        hackathons: 0,
        profile: 0,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const [projects, skills, experiences, certificates, hackathons, profile] = await Promise.all([
                fetch('/api/projects').then(res => res.json()),
                fetch('/api/skills').then(res => res.json()),
                fetch('/api/experiences').then(res => res.json()),
                fetch('/api/certificates').then(res => res.json()),
                fetch('/api/hackathons').then(res => res.json()),
                fetch('/api/my-details').then(res => res.json()),
            ]);

            setStats({
                projects: projects.data?.length || 0,
                skills: skills.data?.length || 0,
                experiences: experiences.data?.length || 0,
                certificates: certificates.data?.length || 0,
                hackathons: hackathons.data?.length || 0,
                profile: profile.data ? 1 : 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setStatsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.name}! Manage your portfolio content.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatsCard title="Projects" count={statsLoading ? '...' : stats.projects} icon="📁" color="blue" />
                    <StatsCard title="Skills" count={statsLoading ? '...' : stats.skills} icon="⚡" color="purple" />
                    <StatsCard title="Experiences" count={statsLoading ? '...' : stats.experiences} icon="💼" color="green" />
                    <StatsCard title="Certificates" count={statsLoading ? '...' : stats.certificates} icon="🏆" color="yellow" />
                    <StatsCard title="Hackathons" count={statsLoading ? '...' : stats.hackathons} icon="🚀" color="red" />
                    <StatsCard title="Profile" count={statsLoading ? '...' : stats.profile} icon="👤" color="indigo" />
                </div>

                <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <QuickAction
                            title="Add New Project"
                            description="Create a new portfolio project"
                            href="/edit/priy/portfolio/dashboard/projects/new"
                        />
                        <QuickAction
                            title="Update Skills"
                            description="Manage your skill categories"
                            href="/edit/priy/portfolio/dashboard/skills"
                        />
                        <QuickAction
                            title="Add Experience"
                            description="Add work experience"
                            href="/edit/priy/portfolio/dashboard/experience/new"
                        />
                        <QuickAction
                            title="Edit Profile"
                            description="Update personal information"
                            href="/edit/priy/portfolio/dashboard/profile"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatsCard({ title, count, icon, color }) {
    const colors = {
        blue: 'from-blue-600 to-blue-700',
        purple: 'from-purple-600 to-purple-700',
        green: 'from-green-600 to-green-700',
        yellow: 'from-yellow-600 to-yellow-700',
        red: 'from-red-600 to-red-700',
        indigo: 'from-indigo-600 to-indigo-700',
    };

    return (
        <div className={`bg-gradient-to-br ${colors[color]} rounded-lg p-6 text-white`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-3xl">{icon}</span>
            </div>
            <p className="text-3xl font-bold">{count}</p>
        </div>
    );
}

function QuickAction({ title, description, href }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-4 text-left transition"
        >
            <h4 className="text-white font-semibold mb-1">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
        </button>
    );
}

