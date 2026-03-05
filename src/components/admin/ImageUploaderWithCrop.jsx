'use client';

import { useState, useRef, useEffect } from 'react'; // Added useEffect
import ImageCropModal from './ImageCropModal';

export default function ImageUploaderWithCrop({
    value,
    onChange,
    folder = 'uploads',
    label = "Upload Image",
    editingImage = null,
    onCancelEdit = null
}) {
    const [uploading, setUploading] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState('');
    const [showCropModal, setShowCropModal] = useState(false);
    const fileInputRef = useRef(null);

    // REMOVED: editModeActiveRef and the if-statement in render body

    // ADDED: useEffect to handle entering edit mode cleanly
    useEffect(() => {
        if (editingImage) {
            setTempImageUrl(editingImage);
            setShowCropModal(true);
        }
    }, [editingImage]);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', folder);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            // Set temp URL and open modal
            setTempImageUrl(data.secure_url);
            setShowCropModal(true);

        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
            // Only reset on error
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } finally {
            setUploading(false);
        }
    };

    const handleCropSave = (croppedUrl) => {
        onChange(croppedUrl);
        setTempImageUrl('');
        setShowCropModal(false);
        // Reset file input after successful save
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Notify parent to clear the editingImage prop
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    const handleCropCancel = () => {
        setShowCropModal(false);
        setTempImageUrl('');
        // Reset file input on cancel
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Notify parent if canceling edit mode
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    const handleReCrop = () => {
        if (value) {
            setTempImageUrl(value);
            setShowCropModal(true);
        }
    };

    const isEditMode = editingImage !== null;
    const buttonLabel = isEditMode ? 'Re-Cropping Image...' : (uploading ? 'Uploading...' : label);

    return (
        <div className="space-y-3">
            {isEditMode && (
                <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 mb-3">
                    <p className="text-purple-300 text-sm font-medium">✏️ Edit Mode: Re-crop existing image</p>
                </div>
            )}

            {/* Upload Button */}
            <div className="flex items-center gap-3">
                <label
                    className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg cursor-pointer transition ${uploading || isEditMode ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {buttonLabel}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading || isEditMode}
                        className="hidden"
                    />
                </label>

                {value && (
                    <button
                        type="button"
                        onClick={handleReCrop}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
                    >
                        Re-Crop Image
                    </button>
                )}
            </div>

            {/* Image Preview */}
            {value && (
                <div className="relative w-full max-w-md">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition"
                    >
                        Remove
                    </button>
                </div>
            )}

            {/* Crop Modal */}
            {showCropModal && tempImageUrl && (
                <ImageCropModal
                    imageUrl={tempImageUrl}
                    onSave={handleCropSave}
                    onClose={handleCropCancel}
                />
            )}
        </div>
    );
}