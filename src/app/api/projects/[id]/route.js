import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Project from '@/models/Project';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// GET /api/projects/[id] - Get single project
export const GET = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    const project = await Project.findById(id).lean();

    if (!project) {
        throw new ApiError('Project not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(project, 'Project retrieved successfully')
    );
});

// PUT /api/projects/[id] - Update project (Admin only)
export const PUT = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    );

    if (!project) {
        throw new ApiError('Project not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(project, 'Project updated successfully')
    );
});

// DELETE /api/projects/[id] - Delete project (Admin only - soft delete)
export const DELETE = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    // Soft delete
    const project = await Project.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!project) {
        throw new ApiError('Project not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(null, 'Project deleted successfully')
    );
});

