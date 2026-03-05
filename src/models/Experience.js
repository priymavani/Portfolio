import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
        maxlength: [100, 'Role cannot exceed 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    period: {
        type: String,
        required: [true, 'Period is required'],
        trim: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    responsibilities: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    location: {
        type: String,
        trim: true
    },
    companyLogo: {
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
experienceSchema.index({ order: 1 });
experienceSchema.index({ isCurrent: -1, startDate: -1 });

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

export default Experience;
