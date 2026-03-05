import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: [true, 'Platform name is required'],
        trim: true,
        enum: ['github', 'linkedin', 'youtube', 'twitter', 'x', 'instagram', 'facebook', 'portfolio', 'email', 'other']
    },
    url: {
        type: String,
        required: [true, 'URL or email is required'],
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
    }
}, { _id: false });

const myDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    title: {
        type: String,
        required: [true, 'Title/Role is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    shortBio: {
        type: String,
        trim: true,
        maxlength: [500, 'Short bio cannot exceed 500 characters']
    },
    photo: {
        type: String,
        required: [true, 'Photo URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid photo URL'
        }
    },
    coverImage: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid cover image URL'
        }
    },
    socialLinks: [socialLinkSchema],
    resume: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid resume URL'
        }
    },
    location: {
        type: String,
        trim: true,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    availability: {
        type: String,
        enum: ['available', 'busy', 'not-available'],
        default: 'available'
    },
    yearsOfExperience: {
        type: Number,
        min: 0
    },
    tagline: {
        type: String,
        trim: true,
        maxlength: [200, 'Tagline cannot exceed 200 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Only allow one active profile
myDetailSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

const MyDetail = mongoose.models.MyDetail || mongoose.model('MyDetail', myDetailSchema);

export default MyDetail;
