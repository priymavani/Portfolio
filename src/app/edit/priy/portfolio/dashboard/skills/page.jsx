'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function SkillsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(data.data || []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/skills/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSkills(skills.filter(s => s._id !== deleteId));
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
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
                        <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
                        <p className="text-gray-400">Manage your skill categories</p>
                    </div>
                    <Link
                        href="/edit/priy/portfolio/dashboard/skills/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        + Add Skill Category
                    </Link>
                </div>

                {/* Skills List */}
                {skills.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-lg">No skill categories found</p>
                        <Link
                            href="/edit/priy/portfolio/dashboard/skills/new"
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Create your first skill category
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill._id}
                                skill={skill}
                                onDelete={() => setDeleteId(skill._id)}
                                onEdit={() => router.push(`/edit/priy/portfolio/dashboard/skills/${skill._id}/edit`)}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Skill Category"
                    message="Are you sure you want to delete this skill category? This action cannot be undone."
                />
            </div>
        </DashboardLayout>
    );
}

function SkillCard({ skill, onDelete, onEdit }) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{skill.category}</h3>
                    <p className="text-gray-400 text-sm">{skill.items?.length || 0} skills</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onEdit}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
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

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skill.items?.map((item, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{item.icon || '⚡'}</span>
                            <span className="text-white text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${item.proficiency || 0}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{item.proficiency || 0}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
