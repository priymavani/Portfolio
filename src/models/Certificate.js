import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Certificate title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    issuer: {
        type: String,
        required: [true, 'Issuer is required'],
        trim: true,
        maxlength: [100, 'Issuer name cannot exceed 100 characters']
    },
    credentialId: {
        type: String,
        required: [true, 'Credential ID is required'],
        trim: true,
        unique: true
    },
    image: {
        type: String,
        required: [true, 'Certificate image URL is required'],
        trim: true
    },
    credentialUrl: {
        type: String,
        required: [true, 'Credential URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid credential URL'
        }
    },
    issueDate: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    skills: [{
        type: String,
        trim: true
    }],
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    visibility: {
        type: Boolean,
        default: true
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
certificateSchema.index({ order: 1 });
certificateSchema.index({ issuer: 1 });

const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

export default Certificate;
