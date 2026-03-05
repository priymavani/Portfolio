'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function ProjectsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data.data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/projects/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProjects(projects.filter(p => p._id !== deleteId));
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                        <p className="text-gray-400">Manage your portfolio projects</p>
                    </div>
                    <Link
                        href="/edit/priy/portfolio/dashboard/projects/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        + Add Project
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-lg">No projects found</p>
                        <Link
                            href="/edit/priy/portfolio/dashboard/projects/new"
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Create your first project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onDelete={() => setDeleteId(project._id)}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Project"
                    message="Are you sure you want to delete this project? This action cannot be undone."
                />
            </div>
        </DashboardLayout>
    );
}

function ProjectCard({ project, onDelete }) {
    const router = useRouter();

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition">
            {/* Image */}
            <div className="aspect-video bg-gray-700 relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                {project.featured && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                        ⭐ Featured
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                    {project.tags?.length > 3 && (
                        <span className="text-gray-500 text-xs px-2 py-1">+{project.tags.length - 3}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/edit/priy/portfolio/dashboard/projects/${project._id}/edit`)}
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
