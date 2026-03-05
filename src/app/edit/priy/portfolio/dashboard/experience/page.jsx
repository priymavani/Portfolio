'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function ExperiencesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/experiences');
            const data = await res.json();
            setExperiences(data.data || []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/experiences/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setExperiences(experiences.filter(e => e._id !== deleteId));
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting experience:', error);
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
                        <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
                        <p className="text-gray-400">Manage your work experience</p>
                    </div>
                    <Link
                        href="/edit/priy/portfolio/dashboard/experience/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        + Add Experience
                    </Link>
                </div>

                {/* Experiences Timeline */}
                {experiences.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-lg">No experiences found</p>
                        <Link
                            href="/edit/priy/portfolio/dashboard/experience/new"
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Add your first experience
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {experiences.map((exp) => (
                            <ExperienceCard
                                key={exp._id}
                                experience={exp}
                                onDelete={() => setDeleteId(exp._id)}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Experience"
                    message="Are you sure you want to delete this experience? This action cannot be undone."
                />
            </div>
        </DashboardLayout>
    );
}

function ExperienceCard({ experience, onDelete }) {
    const router = useRouter();

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
                        {experience.isCurrent && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Current</span>
                        )}
                    </div>
                    <p className="text-blue-400 text-lg mb-2">{experience.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{experience.period}</p>
                    <p className="text-gray-300 mb-4">{experience.description}</p>

                    {/* Technologies */}
                    {experience.technologies && experience.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, index) => (
                                <span key={index} className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => router.push(`/edit/priy/portfolio/dashboard/experience/${experience._id}/edit`)}
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
        </div>
    );
}
