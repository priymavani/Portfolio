'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, FormTextarea, FormSelect, Button } from '@/components/admin/FormComponents';
import LoadingSpinner from '@/components/admin/LoadingSpinner';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        shortBio: '',
        photo: '',
        location: '',
        availability: 'available',
        yearsOfExperience: 0,
        tagline: '',
    });
    const [socialLinks, setSocialLinks] = useState([
        { platform: 'github', url: '', username: '', icon: 'SiGithub' },
        { platform: 'linkedin', url: '', username: '', icon: 'SiLinkedin' },
        { platform: 'email', url: '', username: '', icon: 'MdEmail' },
    ]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/edit/priy/portfolio');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/my-details');
            if (!res.ok) {
                setHasProfile(false);
                return;
            }

            const data = await res.json();
            if (data.success && data.data) {
                setHasProfile(true);
                const profile = data.data;
                setFormData({
                    name: profile.name || '',
                    title: profile.title || '',
                    description: profile.description || '',
                    shortBio: profile.shortBio || '',
                    photo: profile.photo || '',
                    location: profile.location || '',
                    availability: profile.availability === 'unavailable' ? 'not-available' : (profile.availability || 'available'),
                    yearsOfExperience: profile.yearsOfExperience || 0,
                    tagline: profile.tagline || '',
                });
                if (profile.socialLinks && profile.socialLinks.length > 0) {
                    setSocialLinks(profile.socialLinks);
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setHasProfile(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (index, field, value) => {
        const newLinks = [...socialLinks];
        newLinks[index][field] = value;
        setSocialLinks(newLinks);
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: '', url: '', username: '', icon: '' }]);
    };

    const removeSocialLink = (index) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const filteredSocialLinks = socialLinks.filter(
                (link) => link.platform && link.url
            );

            const method = hasProfile ? 'PUT' : 'POST';

            const res = await fetch('/api/my-details', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, socialLinks: filteredSocialLinks })
            });

            const result = await res.json();

            if (res.ok) {
                setHasProfile(true);
                alert('Profile saved successfully!');
            } else {
                alert(result.message || result.error?.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
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
            <div className="p-8 max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-gray-400">Update your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Doe" required />
                        <FormInput label="Professional Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Full Stack Developer" required />
                    </div>

                    <FormTextarea label="About Me" name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about yourself" required rows={4} />
                    <FormTextarea label="Short Bio" name="shortBio" value={formData.shortBio} onChange={handleChange} placeholder="A brief one-liner" rows={2} />
                    <FormInput label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g., Building the web, one line at a time" />

                    <FormInput label="Profile Photo URL" name="photo" value={formData.photo} onChange={handleChange} placeholder="https://example.com/photo.jpg" required />

                    {formData.photo && (
                        <div className="border border-gray-700 rounded-lg overflow-hidden w-32 h-32">
                            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., India" />

                        <FormSelect
                            label="Availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            options={[
                                { value: 'available', label: 'Available' },
                                { value: 'busy', label: 'Busy' },
                                { value: 'not-available', label: 'Unavailable' },
                            ]}
                        />

                        <FormInput label="Years of Experience" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} placeholder="0" />
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Social Links</h3>
                            <button type="button" onClick={addSocialLink} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition">
                                + Add Link
                            </button>
                        </div>

                        {socialLinks.map((link, index) => (
                            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-white font-medium">Link {index + 1}</h4>
                                    {socialLinks.length > 1 && (
                                        <button type="button" onClick={() => removeSocialLink(index)} className="text-red-500 hover:text-red-400 text-sm">
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormSelect
                                        label="Platform"
                                        name={`platform-${index}`}
                                        value={link.platform}
                                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                                        options={[
                                            { value: 'github', label: 'GitHub' },
                                            { value: 'linkedin', label: 'LinkedIn' },
                                            { value: 'youtube', label: 'YouTube' },
                                            { value: 'twitter', label: 'Twitter' },
                                            { value: 'x', label: 'X' },
                                            { value: 'instagram', label: 'Instagram' },
                                            { value: 'facebook', label: 'Facebook' },
                                            { value: 'portfolio', label: 'Portfolio' },
                                            { value: 'email', label: 'Email' },
                                            { value: 'other', label: 'Other' },
                                        ]}
                                    />
                                    <FormInput label="URL" name={`url-${index}`} value={link.url} onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)} placeholder="https://..." />
                                    <FormInput label="Username" name={`username-${index}`} value={link.username} onChange={(e) => handleSocialLinkChange(index, 'username', e.target.value)} placeholder="@username" />
                                    <FormInput label="Icon" name={`icon-${index}`} value={link.icon} onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)} placeholder="SiGithub" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</Button>
                        <Button type="button" variant="secondary" onClick={() => router.push('/edit/priy/portfolio/dashboard')}>Cancel</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
