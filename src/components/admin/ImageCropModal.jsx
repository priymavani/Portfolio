'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg, uploadCroppedImage } from '@/lib/cropUtils';

const ASPECT_RATIOS = {
    horizontal: 16 / 9,
    vertical: 9 / 16
};

export default function ImageCropModal({ imageUrl, onSave, onClose }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS.horizontal);
    const [ratioType, setRatioType] = useState('horizontal');
    const [saving, setSaving] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            setSaving(true);

            // Get cropped image blob
            const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);

            if (!croppedBlob) {
                throw new Error('Failed to crop image');
            }

            // Upload to Cloudinary
            const croppedUrl = await uploadCroppedImage(croppedBlob);

            // Call onSave with the new URL
            onSave(croppedUrl);
            // Modal close is handled by parent's onSave wrapper (handleCropSave)
        } catch (error) {
            console.error('Error cropping image:', error);
            alert('Failed to crop image. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleRatioChange = (type) => {
        setRatioType(type);
        setAspectRatio(ASPECT_RATIOS[type]);
        // Reset crop position when ratio changes
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-2">Crop Image</h2>
                    <p className="text-gray-400 text-sm">Adjust the crop area to fit your desired aspect ratio</p>
                </div>

                {/* Cropper Area */}
                <div className="flex-1 relative min-h-[400px] bg-black">
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        objectFit="contain"
                    />
                </div>

                {/* Controls */}
                <div className="p-6 border-t border-gray-700 space-y-4">
                    {/* Aspect Ratio Buttons */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => handleRatioChange('horizontal')}
                                className={`px-4 py-2 rounded-lg font-medium transition ${ratioType === 'horizontal'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Horizontal (16:9)
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRatioChange('vertical')}
                                className={`px-4 py-2 rounded-lg font-medium transition ${ratioType === 'vertical'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Vertical (9:16)
                            </button>
                        </div>
                    </div>

                    {/* Zoom Slider */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Zoom: {zoom.toFixed(1)}x
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button" // Important: Prevent form submission
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition"
                        >
                            {saving ? 'Saving...' : 'Save Cropped Image'}
                        </button>
                        <button
                            type="button" // Important: Prevent form submission
                            onClick={onClose}
                            disabled={saving}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 text-white font-medium rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}