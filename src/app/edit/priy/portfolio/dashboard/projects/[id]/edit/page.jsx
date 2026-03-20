'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { FormInput, FormTextarea, FormCheckbox, Button, TagInput } from '@/components/admin/FormComponents';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';

export default function EditProjectPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        image: '',
        link: '',
        github: '',
        figma: '',
        postman: '',
        video: '',
        featured: false,
        order: 0,
    });

    useEffect(() => {
        if (params.id) {
            fetchProject();
        }
    }, [params.id]);

    const fetchProject = async () => {
        try {
            console.log('Fetching project with ID:', params.id);
            const res = await fetch(`/api/projects/${params.id}`);
            const data = await res.json();
            console.log('API Response:', data);

            if (data.success && data.data) {
                console.log('Setting form data with:', data.data);
                setFormData({
                    title: data.data.title || '',
                    description: data.data.description || '',
                    tags: data.data.tags || [],
                    image: data.data.image || '',
                    link: data.data.link || '',
                    github: data.data.github || '',
                    figma: data.data.figma || '',
                    postman: data.data.postman || '',
                    video: data.data.video || '',
                    featured: data.data.featured || false,
                    order: data.data.order || 0,
                });
            } else {
                console.error('Invalid API response:', data);
                alert('Failed to load project data');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            alert('Failed to load project: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/projects/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/projects');
            } else {
                const error = await res.json();
                alert(error.message || error.error?.message || 'Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project');
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
                        href="/edit/priy/portfolio/dashboard/projects"
                        className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
                    >
                        ← Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
                    <p className="text-gray-400">Update project information</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    <FormInput
                        label="Project Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter project title"
                        required
                    />

                    <FormTextarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your project"
                        required
                        rows={4}
                    />

                    <TagInput
                        label="Tags"
                        tags={formData.tags}
                        setTags={(tags) => setFormData(prev => ({ ...prev, tags }))}
                        placeholder="Add tag and press Enter"
                    />

                    <ImageUploader
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        folder="projects"
                    />

                    {/* Manual URL Input - Alternative to upload */}
                    <FormInput
                        label="Or paste Image URL directly"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Live Demo Link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />

                        <FormInput
                            label="GitHub Link"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />

                        <FormInput
                            label="Figma Link"
                            name="figma"
                            value={formData.figma}
                            onChange={handleChange}
                            placeholder="https://figma.com/..."
                        />

                        <FormInput
                            label="Postman Link"
                            name="postman"
                            value={formData.postman}
                            onChange={handleChange}
                            placeholder="https://documenter.getpostman.com/..."
                        />

                        <FormInput
                            label="Video Link"
                            name="video"
                            value={formData.video}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                        />

                        <FormInput
                            label="Order"
                            name="order"
                            type="number"
                            value={formData.order}
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>

                    <FormCheckbox
                        label="Featured Project"
                        name="featured"
                        checked={formData.featured}
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
                            onClick={() => router.push('/edit/priy/portfolio/dashboard/projects')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
