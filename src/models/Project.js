import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    tags: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    link: {
        type: String, // Live Demo Link
    },
    github: {
        type: String, // GitHub Repository
    },
    figma: {
        type: String, // Figma Design
    },
    postman: {
        type: String, // Postman Documentation
    },
    video: {
        type: String, // YouTube Video URL
    },
    featured: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

// Prevent OverwriteModelError in Next.js development
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;