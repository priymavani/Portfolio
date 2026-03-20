import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    }
}, { _id: false });

const StageSchema = new mongoose.Schema({
    stageType: {
        type: String,
        required: true,
        enum: ['online', 'offline', 'ppt', 'application', 'other']
    },
    stageNumber: {
        type: Number,
        required: true
    },
    stageName: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    mode: {
        type: String,
        enum: ['virtual', 'in-person', 'hybrid', 'offline'],
        default: 'virtual'
    },
    projectTitle: {
        type: String,
        trim: true
    },
    projectRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    projectName: {
        type: String,
        trim: true
    },
    projectLink: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['participated', 'selected', 'qualified', 'won', 'runner-up', 'skipped'],
        required: true,
        default: 'participated'
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, { _id: false });

const PipelineStageSchema = new mongoose.Schema({
    duration: String,
    projectTitle: String,
    projectRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    projectName: String,
    projectLink: String,
}, { _id: false });

const HackathonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a hackathon title'],
        trim: true,
    },
    badge: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
    },
    images: {
        type: [String],
        default: [],
        validate: {
            validator: function (arr) {
                return arr && arr.length > 0;
            },
            message: 'At least one image is required'
        }
    },
    teamMembers: {
        type: [TeamMemberSchema],
        default: [],
    },

    // NEW: Flexible stages array
    stages: {
        type: [StageSchema],
        default: []
    },

    // Overall final status
    finalStatus: {
        type: String,
        enum: ['participated', 'finalist', 'winner', 'runner-up'],
        default: 'participated'
    },

    // DEPRECATED: Old pipeline structure (kept for backward compatibility)
    // Using Mixed type to avoid validation issues
    pipeline: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: undefined
    },
    visibility: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

// Prevent OverwriteModelError in Next.js development
const Hackathon = mongoose.models.Hackathon || mongoose.model('Hackathon', HackathonSchema);

export default Hackathon;
