import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: [true, 'Platform name is required'],
        trim: true,
        enum: ['github', 'linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'portfolio', 'email', 'x', 'other'],
        unique: true
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                // Allow email format for email platform
                if (this.platform === 'email') {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                }
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL or email'
        }
    },
    username: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
socialLinkSchema.index({ platform: 1 });
socialLinkSchema.index({ order: 1 });

const SocialLink = mongoose.models.SocialLink || mongoose.model('SocialLink', socialLinkSchema);

export default SocialLink;
