'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, Button, TagInput } from '@/components/admin/FormComponents';
import Link from 'next/link';

export default function NewCertificatePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        credentialId: '',
        image: '',
        credentialUrl: '',
        skills: [],
        issueDate: '',
        order: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/certificates');
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to create certificate');
            }
        } catch (error) {
            console.error('Error creating certificate:', error);
            alert('Failed to create certificate');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

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
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Certificate</h1>
                    <p className="text-gray-400">Add a new certification</p>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Credential URL"
                            name="credentialUrl"
                            value={formData.credentialUrl}
                            onChange={handleChange}
                            placeholder="https://..."
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

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Certificate'}
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
