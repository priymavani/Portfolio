import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true
    },
    icon: {
        type: String,
        required: [true, 'Skill icon identifier is required'],
        trim: true
    },
    proficiency: {
        type: Number,
        min: 0,
        max: 100,
        default: 70
    },
    isMono: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Skill category is required'],
        trim: true,
        enum: ['Frontend', 'Backend', 'Tools & Technologies', 'Other Skills', 'Database', 'DevOps', 'Core Engineering']
    },
    items: [skillItemSchema],
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
skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;
