'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function CertificatesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await fetch('/api/certificates');
            const data = await res.json();
            setCertificates(data.data || []);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/certificates/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setCertificates(certificates.filter(c => c._id !== deleteId));
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting certificate:', error);
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
                        <h1 className="text-3xl font-bold text-white mb-2">Certificates</h1>
                        <p className="text-gray-400">Manage your certifications</p>
                    </div>
                    <Link
                        href="/edit/priy/portfolio/dashboard/certificates/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        + Add Certificate
                    </Link>
                </div>

                {/* Certificates Grid */}
                {certificates.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-lg">No certificates found</p>
                        <Link
                            href="/edit/priy/portfolio/dashboard/certificates/new"
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            Add your first certificate
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert) => (
                            <CertificateCard
                                key={cert._id}
                                certificate={cert}
                                onDelete={() => setDeleteId(cert._id)}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Certificate"
                    message="Are you sure you want to delete this certificate? This action cannot be undone."
                />
            </div>
        </DashboardLayout>
    );
}

function CertificateCard({ certificate, onDelete }) {
    const router = useRouter();

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition">
            {/* Image */}
            <div className="aspect-video bg-gray-700 relative">
                <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{certificate.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{certificate.issuer}</p>

                {certificate.credentialId && (
                    <p className="text-gray-500 text-xs mb-3">ID: {certificate.credentialId}</p>
                )}

                {/* Skills */}
                {certificate.skills && certificate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {certificate.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                        {certificate.skills.length > 3 && (
                            <span className="text-gray-500 text-xs px-2 py-1">+{certificate.skills.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/edit/priy/portfolio/dashboard/certificates/${certificate._id}/edit`)}
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
