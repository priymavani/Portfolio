import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        enum: ['github', 'leetcode'],
        index: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Store the entire API response
        required: true
    },
    fetchedAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    isLatest: {
        type: Boolean,
        default: true,
        index: true
    }
}, {
    timestamps: true
});

// Index for fast queries: Get latest stats for a platform
statsSchema.index({ platform: 1, isLatest: 1, fetchedAt: -1 });

// Prevent OverwriteModelError in Next.js development
const Stats = mongoose.models.Stats || mongoose.model('Stats', statsSchema);

export default Stats;
