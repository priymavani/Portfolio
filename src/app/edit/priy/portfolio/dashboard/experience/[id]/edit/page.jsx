'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, FormTextarea, FormCheckbox, Button, TagInput } from '@/components/admin/FormComponents';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function EditExperiencePage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        if (params.id) fetchExperience();
    }, [params.id]);

    const fetchExperience = async () => {
        try {
            const res = await fetch(`/api/experiences/${params.id}`);
            const data = await res.json();
            if (data.success && data.data) {
                const exp = data.data;
                setFormData({
                    role: exp.role || '',
                    company: exp.company || '',
                    period: exp.period || '',
                    startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
                    endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
                    isCurrent: exp.isCurrent || false,
                    description: exp.description || '',
                    technologies: exp.technologies || [],
                    location: exp.location || '',
                    order: exp.order || 0,
                });
            }
        } catch (error) {
            console.error('Error fetching experience:', error);
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
            const res = await fetch(`/api/experiences/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/experience');
            } else {
                const error = await res.json();
                alert(error.message || error.error?.message || 'Failed to update experience');
            }
        } catch (error) {
            console.error('Error updating experience:', error);
            alert('Failed to update experience');
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;
    if (loading) return <DashboardLayout><div className="p-8"><LoadingSpinner size="lg" /></div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/edit/priy/portfolio/dashboard/experience" className="text-blue-500 hover:text-blue-400 mb-4 inline-block">← Back to Experience</Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Experience</h1>
                    <p className="text-gray-400">Update experience information</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Role" name="role" value={formData.role} onChange={handleChange} required />
                        <FormInput label="Company" name="company" value={formData.company} onChange={handleChange} required />
                    </div>

                    <FormInput label="Period" name="period" value={formData.period} onChange={handleChange} required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                        <FormInput label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} disabled={formData.isCurrent} />
                    </div>

                    <FormCheckbox label="Currently working here" name="isCurrent" checked={formData.isCurrent} onChange={handleChange} />
                    <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} required rows={4} />
                    <TagInput label="Technologies" tags={formData.technologies} setTags={(technologies) => setFormData(prev => ({ ...prev, technologies }))} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
                        <FormInput label="Order" name="order" type="number" value={formData.order} onChange={handleChange} />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                        <Button type="button" variant="secondary" onClick={() => router.push('/edit/priy/portfolio/dashboard/experience')}>Cancel</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
