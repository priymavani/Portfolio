import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Skill from '@/models/Skill';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

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
