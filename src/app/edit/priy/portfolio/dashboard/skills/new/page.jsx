'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { FormInput, Button } from '@/components/admin/FormComponents';
import Link from 'next/link';

export default function NewSkillPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        order: 0,
    });
    const [items, setItems] = useState([
        { name: '', icon: '', proficiency: 50 }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', icon: '', proficiency: 50 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, items })
            });

            if (res.ok) {
                router.push('/edit/priy/portfolio/dashboard/skills');
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to create skill category');
            }
        } catch (error) {
            console.error('Error creating skill:', error);
            alert('Failed to create skill category');
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
                        href="/edit/priy/portfolio/dashboard/skills"
                        className="text-blue-500 hover:text-blue-400 mb-4 inline-block"
                    >
                        ← Back to Skills
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Skill Category</h1>
                    <p className="text-gray-400">Create a new skill category with items</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Category Name"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Frontend, Backend"
                            required
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

                    {/* Skills Items */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Skills</h3>
                            <button
                                type="button"
                                onClick={addItem}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
                            >
                                + Add Skill
                            </button>
                        </div>

                        {items.map((item, index) => (
                            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-white font-medium">Skill {index + 1}</h4>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="text-red-500 hover:text-red-400 text-sm"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormInput
                                        label="Skill Name"
                                        name={`name-${index}`}
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        placeholder="e.g., React"
                                        required
                                    />

                                    <FormInput
                                        label="Icon (emoji or icon name)"
                                        name={`icon-${index}`}
                                        value={item.icon}
                                        onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                                        placeholder="e.g., ⚛️ or SiReact"
                                    />

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Proficiency: {item.proficiency}%
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={item.proficiency}
                                            onChange={(e) => handleItemChange(index, 'proficiency', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Skill Category'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.push('/edit/priy/portfolio/dashboard/skills')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
