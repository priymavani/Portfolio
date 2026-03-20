'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, FormCheckbox, Button, TagInput } from '@/components/admin/FormComponents';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function EditCertificatePage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        credentialId: '',
        image: '',
        credentialUrl: '',
        skills: [],
        issueDate: '',
        visibility: true,
        order: 0,
    });

    useEffect(() => {
        if (params.id) {
            fetchCertificate();
        }
    }, [params.id]);

    const fetchCertificate = async () => {
        try {
            const res = await fetch(`/api/certificates/${params.id}`);
            const data = await res.json();
            if (data.success && data.data) {
                const cert = data.data;
                setFormData({
                    title: cert.title || '',
                    issuer: cert.issuer || '',
                    credentialId: cert.credentialId || '',
                    image: cert.image || '',
                    credentialUrl: cert.credentialUrl || '',
                    skills: cert.skills || [],
                    issueDate: cert.issueDate ? cert.issueDate.split('T')[0] : '',
                    visibility: cert.visibility !== false ? true : false,
                    order: cert.order || 0,
                });
            }
        } catch (error) {
            console.error('Error fetching certificate:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/certificates/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/certificates');
            } else {
                const error = await res.json();
                alert(error.message || error.error?.message || 'Failed to update certificate');
            }
        } catch (error) {
            console.error('Error updating certificate:', error);
            alert('Failed to update certificate');
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-8">
                    <LoadingSpinner size="lg" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-8 max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/edit/priy/portfolio/dashboard/certificates"
                        className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
                    >
                        ← Back to Certificates
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Certificate</h1>
                    <p className="text-gray-400">Update certificate information</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    <FormInput
                        label="Certificate Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., JavaScript (Basic)"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Issuer"
                            name="issuer"
                            value={formData.issuer}
                            onChange={handleChange}
                            placeholder="e.g., HackerRank"
                            required
                        />

                        <FormInput
                            label="Credential ID"
                            name="credentialId"
                            value={formData.credentialId}
                            onChange={handleChange}
                            placeholder="e.g., ABC123XYZ"
                            required
                        />
                    </div>

                    <FormInput
                        label="Certificate Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/certificate.jpg"
                        required
                    />

                    {/* Image Preview */}
                    {formData.image && (
                        <div className="border border-gray-700 rounded-lg overflow-hidden">
                            <img src={formData.image} alt="Preview" className="w-full h-64 object-cover" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Credential URL"
                            name="credentialUrl"
                            value={formData.credentialUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            required
                        />

                        <FormInput
                            label="Issue Date"
                            name="issueDate"
                            type="date"
                            value={formData.issueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <TagInput
                        label="Skills"
                        tags={formData.skills}
                        setTags={(skills) => setFormData(prev => ({ ...prev, skills }))}
                        placeholder="Add skill and press Enter"
                    />

                    <FormInput
                        label="Order"
                        name="order"
                        type="number"
                        value={formData.order}
                        onChange={handleChange}
                        placeholder="0"
                    />

                    <FormCheckbox
                        label="Visible in Portfolio"
                        name="visibility"
                        checked={formData.visibility}
                        onChange={handleChange}
                    />

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.push('/edit/priy/portfolio/dashboard/certificates')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
