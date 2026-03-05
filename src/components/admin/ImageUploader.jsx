'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

export default function ImageUploader({ value, onChange, folder = 'projects' }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload JPG, PNG, GIF, or WebP images.');
        }

        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            throw new Error('File size too large. Maximum size is 5MB.');
        }

        return true;
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');

        try {
            // Validate file
            validateFile(file);

            // Show preview immediately
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload to Cloudinary
            await uploadToCloudinary(file);
        } catch (err) {
            setError(err.message);
            setPreview(value || '');
        }
    };

    const uploadToCloudinary = async (file) => {
        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default');
            formData.append('folder', folder);

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

            if (!cloudName) {
                throw new Error('Cloudinary configuration missing. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to .env.local');
            }

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed. Please try again.');
            }

            const data = await response.json();

            // Return the secure URL
            const imageUrl = data.secure_url;
            setPreview(imageUrl);
            onChange(imageUrl);

            console.log('✅ Image uploaded successfully:', imageUrl);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload image');
            setPreview(value || '');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
                Project Image
                <span className="text-red-500 ml-1">*</span>
            </label>

            {/* Upload Area */}
            <div className="relative">
                {preview ? (
                    // Preview with uploaded/selected image
                    <div className="relative group">
                        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-700 bg-gray-900 ">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-fill"
                            />
                        </div>

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleClick}
                                disabled={uploading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
                            >
                                <FiUpload />
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={uploading}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                            >
                                <FiX />
                                Remove
                            </button>
                        </div>

                        {/* Upload progress overlay */}
                        {uploading && (
                            <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-3"></div>
                                    <p className="text-sm font-medium">Uploading...</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Empty state - click to upload
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={uploading}
                        className={`
              w-full aspect-video rounded-lg border-2 border-dashed 
              ${error ? 'border-red-500 bg-red-500/5' : 'border-gray-600 bg-gray-800/50'}
              hover:border-blue-500 hover:bg-gray-800 
              transition-colors flex flex-col items-center justify-center
              ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
                    >
                        {uploading ? (
                            <div className="text-center text-gray-400">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
                                <p className="text-sm font-medium">Uploading...</p>
                            </div>
                        ) : (
                            <>
                                <FiImage className="w-12 h-12 text-gray-500 mb-3" />
                                <p className="text-gray-400 font-medium mb-1">Click to upload image</p>
                                <p className="text-gray-500 text-sm">JPG, PNG, GIF, or WebP (max 5MB)</p>
                            </>
                        )}
                    </button>
                )}

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                        <FiX className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {/* Helper text */}
            <p className="text-xs text-gray-500">
                Image will be uploaded to Cloudinary.
            </p>
        </div>
    );
}
