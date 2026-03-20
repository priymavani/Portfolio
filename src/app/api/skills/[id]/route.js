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

// GET /api/skills/[id] - Get single skill category
export const GET = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const skill = await Skill.findById(id).lean();

    if (!skill) {
        throw new ApiError('Skill category not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(skill, 'Skill category retrieved successfully')
    );
});

// PUT /api/skills/[id] - Update skill category (Admin only)
export const PUT = asyncHandler(async (request, context) => {
    await connectDB();
    await requireAdmin(request);

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const skill = await Skill.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    );

    if (!skill) {
        throw new ApiError('Skill category not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(skill, 'Skill category updated successfully')
    );
});

// DELETE /api/skills/[id] - Delete skill category (Admin only)
export const DELETE = asyncHandler(async (request, context) => {
    await connectDB();
    await requireAdmin(request);

    const params = await context.params;
    const { id } = params;

    const skill = await Skill.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!skill) {
        throw new ApiError('Skill category not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(null, 'Skill category deleted successfully')
    );
});
