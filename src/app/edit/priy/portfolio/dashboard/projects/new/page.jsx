'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { FormInput, FormTextarea, FormCheckbox, Button, TagInput } from '@/components/admin/FormComponents';

import Link from 'next/link';

export default function NewProjectPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
        visibility: true,
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
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/projects');
            } else {
                const error = await res.json();
                alert(error.message || error.error?.message || 'Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project');
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
                        href="/edit/priy/portfolio/dashboard/projects"
                        className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
                    >
                        ← Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Project</h1>
                    <p className="text-gray-400">Create a new portfolio project</p>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormCheckbox
                            label="Featured Project"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />

                        <FormCheckbox
                            label="Visible in Portfolio"
                            name="visibility"
                            checked={formData.visibility}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Project'}
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
