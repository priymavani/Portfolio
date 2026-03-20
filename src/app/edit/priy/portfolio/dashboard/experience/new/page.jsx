'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, FormTextarea, FormCheckbox, Button, TagInput } from '@/components/admin/FormComponents';
import Link from 'next/link';

export default function NewExperiencePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        period: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        technologies: [],
        location: '',
        order: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/experiences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/experience');
            } else {
                const error = await res.json();
                alert(error.message || error.error?.message || 'Failed to create experience');
            }
        } catch (error) {
            console.error('Error creating experience:', error);
            alert('Failed to create experience');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="p-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/edit/priy/portfolio/dashboard/experience" className="text-blue-500 hover:text-blue-400 mb-4 inline-block">
                        ← Back to Experience
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Experience</h1>
                    <p className="text-gray-400">Add work experience</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Role" name="role" value={formData.role} onChange={handleChange} placeholder="e.g., Full Stack Developer" required />
                        <FormInput label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g., Tech Corp" required />
                    </div>

                    <FormInput label="Period" name="period" value={formData.period} onChange={handleChange} placeholder="e.g., 2023 - Present" required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                        <FormInput label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} disabled={formData.isCurrent} />
                    </div>

                    <FormCheckbox label="Currently working here" name="isCurrent" checked={formData.isCurrent} onChange={handleChange} />

                    <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe your role and responsibilities" required rows={4} />

                    <TagInput label="Technologies" tags={formData.technologies} setTags={(technologies) => setFormData(prev => ({ ...prev, technologies }))} placeholder="Add technology and press Enter" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Remote, New York" />
                        <FormInput label="Order" name="order" type="number" value={formData.order} onChange={handleChange} placeholder="0" />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Creating...' : 'Create Experience'}</Button>
                        <Button type="button" variant="secondary" onClick={() => router.push('/edit/priy/portfolio/dashboard/experience')}>Cancel</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
