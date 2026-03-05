'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import ImageUploaderWithCrop from '@/components/admin/ImageUploaderWithCrop';
import { FormInput, Button } from '@/components/admin/FormComponents';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Link from 'next/link';
import { FiArrowUp, FiArrowDown, FiTrash2, FiPlus } from 'react-icons/fi';

export default function EditHackathonPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState(null);
    const [editingImageIndex, setEditingImageIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch hackathon
                const hackathonRes = await fetch(`/api/hackathons/${params.id}`);
                const hackathonData = await hackathonRes.json();

                // Fetch projects
                const projectsRes = await fetch('/api/projects');
                const projectsData = await projectsRes.json();

                if (hackathonData.success) {
                    const hackathon = hackathonData.data;

                    // Convert old pipeline format to stages if needed
                    let stages = hackathon.stages;
                    if (!stages || stages.length === 0) {
                        // Convert from old pipeline format
                        stages = [];
                        if (hackathon.pipeline?.online) {
                            stages.push({
                                stageType: 'online',
                                stageNumber: 1,
                                stageName: 'Online Round',
                                duration: hackathon.pipeline.online.duration || '',
                                mode: 'virtual',
                                projectTitle: hackathon.pipeline.online.projectTitle || '',
                                projectRef: hackathon.pipeline.online.projectRef || '',
                                projectName: hackathon.pipeline.online.projectName || '',
                                projectLink: hackathon.pipeline.online.projectLink || '',
                                status: 'participated',
                                description: ''
                            });
                        }
                        if (hackathon.pipeline?.offline?.status && hackathon.pipeline.offline.status !== 'Skipped') {
                            stages.push({
                                stageType: 'offline',
                                stageNumber: 2,
                                stageName: 'Offline Finals',
                                duration: hackathon.pipeline.offline.duration || '',
                                location: hackathon.pipeline.offline.location || '',
                                mode: 'in-person',
                                projectTitle: hackathon.pipeline.offline.projectTitle || '',
                                projectRef: hackathon.pipeline.offline.projectRef || '',
                                projectName: hackathon.pipeline.offline.projectName || '',
                                projectLink: hackathon.pipeline.offline.projectLink || '',
                                status: hackathon.pipeline.offline.status?.toLowerCase() || 'participated',
                                description: ''
                            });
                        }
                    }

                    // Ensure at least one stage
                    if (stages.length === 0) {
                        stages = [{
                            stageType: 'online',
                            stageNumber: 1,
                            stageName: '',
                            duration: '',
                            mode: 'virtual',
                            status: 'participated',
                            description: ''
                        }];
                    }

                    setFormData({
                        title: hackathon.title || '',
                        badge: hackathon.badge || '',
                        date: hackathon.date ? hackathon.date.split('T')[0] : '',
                        images: hackathon.images || [],
                        teamMembers: hackathon.teamMembers?.length > 0 ? hackathon.teamMembers : [{ name: '', role: '' }],
                        stages: stages,
                        finalStatus: hackathon.finalStatus || 'participated',
                        order: hackathon.order || 0,
                    });
                }

                if (projectsData.success) {
                    setProjects(projectsData.data || []);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to load hackathon');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Team Members Management
    const handleTeamMemberChange = (index, field, value) => {
        const newTeamMembers = [...formData.teamMembers];
        newTeamMembers[index][field] = value;
        setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }));
    };

    const addTeamMember = () => {
        setFormData(prev => ({
            ...prev,
            teamMembers: [...prev.teamMembers, { name: '', role: '' }]
        }));
    };

    const removeTeamMember = (index) => {
        setFormData(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.filter((_, i) => i !== index)
        }));
    };

    // Image Management
    const addImage = (url) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, url]
        }));
    };

    const updateImage = (index, url) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map((img, i) => i === index ? url : img)
        }));
        setEditingImageIndex(null);
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    // Stage Management
    const addStage = () => {
        setFormData(prev => ({
            ...prev,
            stages: [...prev.stages, {
                stageType: 'online',
                stageNumber: prev.stages.length + 1,
                stageName: '',
                duration: '',
                location: '',
                mode: 'virtual',
                projectTitle: '',
                projectRef: '',
                projectName: '',
                projectLink: '',
                status: 'participated',
                description: ''
            }]
        }));
    };

    const removeStage = (index) => {
        if (formData.stages.length === 1) {
            alert('At least one stage is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            stages: prev.stages
                .filter((_, i) => i !== index)
                .map((stage, idx) => ({ ...stage, stageNumber: idx + 1 }))
        }));
    };

    const updateStage = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            stages: prev.stages.map((stage, i) =>
                i === index ? { ...stage, [field]: value } : stage
            )
        }));
    };

    const moveStage = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= formData.stages.length) return;

        const newStages = [...formData.stages];
        [newStages[index], newStages[newIndex]] = [newStages[newIndex], newStages[index]];

        setFormData(prev => ({
            ...prev,
            stages: newStages.map((stage, idx) => ({ ...stage, stageNumber: idx + 1 }))
        }));
    };

    const handleProjectSelect = (stageIndex, projectId) => {
        const project = projects.find(p => p._id === projectId);
        if (project) {
            updateStage(stageIndex, 'projectRef', project._id);
            updateStage(stageIndex, 'projectName', project.title);
            updateStage(stageIndex, 'projectLink', project.github || project.link || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Validate stages
            const stageErrors = [];
            formData.stages.forEach((stage, idx) => {
                if (!stage.stageType) stageErrors.push(`Stage ${idx + 1}: Type is required`);
                if (!stage.mode) stageErrors.push(`Stage ${idx + 1}: Mode is required`);
                if (['in-person', 'hybrid', 'offline'].includes(stage.mode) && !stage.location) {
                    stageErrors.push(`Stage ${idx + 1}: Location is required for ${stage.mode} mode`);
                }
                if (!stage.status) stageErrors.push(`Stage ${idx + 1}: Status is required`);
            });

            if (stageErrors.length > 0) {
                alert('Please fix the following errors:\n' + stageErrors.join('\n'));
                setSaving(false);
                return;
            }

            // Filter out empty team members
            const filteredTeamMembers = formData.teamMembers.filter(m => m.name.trim());

            const res = await fetch(`/api/hackathons/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    teamMembers: filteredTeamMembers
                })
            });

            const data = await res.json();

            if (data.success) {
                router.push('/edit/priy/portfolio/dashboard/hackathons');
            } else {
                alert(`Error: ${data.error || 'Failed to update hackathon'}`);
            }
        } catch (error) {
            console.error('Error updating hackathon:', error);
            alert('Failed to update hackathon');
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner />
                </div>
            </DashboardLayout>
        );
    }

    if (!formData) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-white">Hackathon not found</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link
                            href="/edit/priy/portfolio/dashboard/hackathons"
                            className="text-blue-500 hover:text-blue-400 mb-2 inline-block"
                        >
                            ← Back to Hackathons
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Edit Hackathon</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            <FormInput
                                label="Hackathon Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Badge / Achievement
                                </label>
                                <input
                                    type="text"
                                    name="badge"
                                    value={formData.badge}
                                    onChange={handleChange}
                                    placeholder="e.g., Winner, Top 10, Finalist"
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <FormInput
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">Team Members</h2>
                            <button
                                type="button"
                                onClick={addTeamMember}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                            >
                                <FiPlus /> Add Member
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.teamMembers.map((member, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => handleTeamMemberChange(idx, 'name', e.target.value)}
                                        placeholder="Name"
                                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    />
                                    <input
                                        type="text"
                                        value={member.role}
                                        onChange={(e) => handleTeamMemberChange(idx, 'role', e.target.value)}
                                        placeholder="Role (optional)"
                                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    />
                                    {formData.teamMembers.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTeamMember(idx)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Gallery</h2>
                        <p className="text-sm text-gray-400 mb-4">Upload images and crop them to horizontal (16:9) or vertical (9:16) aspect ratio</p>

                        <ImageUploaderWithCrop
                            value=""
                            onChange={editingImageIndex !== null ? (url) => updateImage(editingImageIndex, url) : addImage}
                            folder="hackathons"
                            label="Add Image (will open crop editor)"
                            editingImage={editingImageIndex !== null ? formData.images[editingImageIndex] : null}
                            onCancelEdit={() => setEditingImageIndex(null)}
                        />

                        {/* Image Previews */}
                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={img} alt={`Image ${idx + 1}`} className="w-full h-32 object-cover rounded border border-gray-600" />
                                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                            <button
                                                type="button"
                                                onClick={() => setEditingImageIndex(idx)}
                                                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hackathon Stages */}
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Hackathon Stages</h2>
                                <p className="text-sm text-gray-400 mt-1">Manage the stages of this hackathon</p>
                            </div>
                            <button
                                type="button"
                                onClick={addStage}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                            >
                                <FiPlus /> Add Stage
                            </button>
                        </div>

                        <div className="space-y-6">
                            {formData.stages.map((stage, idx) => (
                                <div key={idx} className="bg-gray-900 p-5 rounded-lg border border-gray-600">
                                    {/* Stage Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-white">Stage {stage.stageNumber}</h3>
                                        <div className="flex gap-2">
                                            {idx > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => moveStage(idx, 'up')}
                                                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
                                                    title="Move Up"
                                                >
                                                    <FiArrowUp />
                                                </button>
                                            )}
                                            {idx < formData.stages.length - 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => moveStage(idx, 'down')}
                                                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
                                                    title="Move Down"
                                                >
                                                    <FiArrowDown />
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeStage(idx)}
                                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                                                title="Remove Stage"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Stage Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Stage Type *</label>
                                            <select
                                                value={stage.stageType}
                                                onChange={(e) => updateStage(idx, 'stageType', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                required
                                            >
                                                <option value="online">Online Round</option>
                                                <option value="offline">Offline Round</option>
                                                <option value="ppt">PPT/Presentation</option>
                                                <option value="application">Application/Proposal</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        {/* Mode */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Mode *</label>
                                            <select
                                                value={stage.mode}
                                                onChange={(e) => updateStage(idx, 'mode', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                required
                                            >
                                                <option value="virtual">Virtual</option>
                                                <option value="in-person">In-Person</option>
                                                <option value="hybrid">Hybrid</option>
                                                <option value="offline">Offline</option>
                                            </select>
                                        </div>

                                        {/* Stage Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Stage Name (Optional)</label>
                                            <input
                                                type="text"
                                                value={stage.stageName || ''}
                                                onChange={(e) => updateStage(idx, 'stageName', e.target.value)}
                                                placeholder="e.g., Qualifier, Finals"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            />
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                                            <input
                                                type="text"
                                                value={stage.duration || ''}
                                                onChange={(e) => updateStage(idx, 'duration', e.target.value)}
                                                placeholder="e.g., 8h, 2 days, 36 hours"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            />
                                        </div>

                                        {/* Location (conditional) */}
                                        {['in-person', 'hybrid', 'offline'].includes(stage.mode) && (
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                                                <input
                                                    type="text"
                                                    value={stage.location || ''}
                                                    onChange={(e) => updateStage(idx, 'location', e.target.value)}
                                                    placeholder="e.g., Mumbai, SPIT"
                                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                    required
                                                />
                                            </div>
                                        )}

                                        {/* Project Selection */}
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Project (Optional)</label>
                                            <select
                                                value={stage.projectRef || ''}
                                                onChange={(e) => handleProjectSelect(idx, e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            >
                                                <option value="">-- Select Project (Optional) --</option>
                                                {projects.map(p => (
                                                    <option key={p._id} value={p._id}>{p.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Stage Outcome *</label>
                                            <select
                                                value={stage.status}
                                                onChange={(e) => updateStage(idx, 'status', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                                required
                                            >
                                                <option value="participated">Participated</option>
                                                <option value="selected">Selected</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="won">Won</option>
                                                <option value="runner-up">Runner-up</option>
                                                <option value="skipped">Skipped</option>
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes (Optional)</label>
                                            <textarea
                                                value={stage.description || ''}
                                                onChange={(e) => updateStage(idx, 'description', e.target.value)}
                                                placeholder="Any additional details about this stage..."
                                                rows="2"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overall Result */}
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Overall Result</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Final Status *</label>
                            <select
                                name="finalStatus"
                                value={formData.finalStatus}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                required
                            >
                                <option value="participated">Participated</option>
                                <option value="finalist">Finalist</option>
                                <option value="winner">Winner</option>
                                <option value="runner-up">Runner-up</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Button type="submit" disabled={saving}>
                            {saving ? 'Updating...' : 'Update Hackathon'}
                        </Button>
                        <Link
                            href="/edit/priy/portfolio/dashboard/hackathons"
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
