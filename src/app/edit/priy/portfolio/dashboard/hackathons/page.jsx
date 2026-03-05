'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function HackathonsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        try {
            const res = await fetch('/api/hackathons');
            const data = await res.json();
            setHackathons(data.data || []);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/hackathons/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setHackathons(hackathons.filter(h => h._id !== deleteId));
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting hackathon:', error);
        }
    };

    if (authLoading || loading) {
        return (
            <DashboardLayout>
                <div className="p-8">
                    <LoadingSpinner size="lg" />
                </div>
            </DashboardLayout>
        );
    }

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Hackathons</h1>
                        <p className="text-gray-400">Manage your hackathon projects</p>
                    </div>
                    <Link
                        href="/edit/priy/portfolio/dashboard/hackathons/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        + Add Hackathon
                    </Link>
                </div>

                {/* Hackathons Grid */}
                {hackathons.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-lg">No hackathons found</p>
                        <Link
                            href="/edit/priy/portfolio/dashboard/hackathons/new"
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Add your first hackathon
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hackathons.map((hackathon) => (
                            <HackathonCard
                                key={hackathon._id}
                                hackathon={hackathon}
                                onDelete={() => setDeleteId(hackathon._id)}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Hackathon"
                    message="Are you sure you want to delete this hackathon? This action cannot be undone."
                />
            </div>
        </DashboardLayout>
    );
}

function HackathonCard({ hackathon, onDelete }) {
    const router = useRouter();

    // Determine pipeline status
    const hasOffline = hackathon.pipeline?.offline?.status && hackathon.pipeline.offline.status !== 'Skipped';
    const offlineStatus = hackathon.pipeline?.offline?.status || 'Skipped';

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition">
            {/* Image */}
            <div className="aspect-video bg-gray-700 relative">
                {hackathon.images && hackathon.images.length > 0 && (
                    <img
                        src={hackathon.images[0]}
                        alt={hackathon.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {hackathon.badge && (
                    <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                        {hackathon.badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{hackathon.title}</h3>

                {/* Date */}
                {hackathon.date && (
                    <p className="text-gray-400 text-sm mb-3">
                        {new Date(hackathon.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                )}

                {/* Pipeline Status */}
                <div className="mb-4">
                    <p className="text-gray-500 text-xs mb-2">Pipeline Status:</p>
                    <div className="flex items-center gap-2">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Online ✓
                        </span>
                        {hasOffline && (
                            <>
                                <span className="text-gray-500">→</span>
                                <span className={`text-white text-xs px-2 py-1 rounded ${offlineStatus === 'Won' ? 'bg-yellow-500 text-black' :
                                        offlineStatus === 'Participated' ? 'bg-blue-600' :
                                            'bg-purple-600'
                                    }`}>
                                    {offlineStatus}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Team Members */}
                {hackathon.teamMembers && hackathon.teamMembers.length > 0 && (
                    <div className="mb-4">
                        <p className="text-gray-500 text-xs mb-2">Team Members:</p>
                        <div className="flex flex-wrap gap-2">
                            {hackathon.teamMembers.map((member, index) => (
                                <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                                    {member.name}{member.role ? ` (${member.role})` : ''}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/edit/priy/portfolio/dashboard/hackathons/${hackathon._id}/edit`)}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
