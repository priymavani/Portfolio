import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Skill from '@/models/Skill';
import User from '@/models/User';
import { isAuthenticated } from '@/lib/auth';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

const requireAdmin = async (request) => {
    const { authenticated, userId } = await isAuthenticated(request);

    if (!authenticated) {
        throw new ApiError('Not authenticated', 401);
    }

    const user = await User.findById(userId).select('role isActive').lean();
    if (!user || !user.isActive || user.role !== 'admin') {
        throw new ApiError('Forbidden', 403);
    }
};

// GET /api/skills - Get all skills grouped by category
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const query = { isActive: true };

    if (category) {
        query.category = category;
    }

    const skills = await Skill.find(query)
        .sort({ order: 1 })
        .lean();

    return NextResponse.json(
        ApiResponse.success(skills, 'Skills retrieved successfully')
    );
});

// POST /api/skills - Create new skill category (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    if (!body.category || !body.items || body.items.length === 0) {
        throw new ApiError('Category and items are required', 400);
    }

    const skill = await Skill.create(body);

    return NextResponse.json(
        ApiResponse.created(skill, 'Skill category created successfully'),
        { status: 201 }
    );
});
