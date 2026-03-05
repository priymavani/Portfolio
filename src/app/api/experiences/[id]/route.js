import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Experience from '@/models/Experience';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// GET /api/experiences/[id] - Get single experience
export const GET = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const experience = await Experience.findById(id).lean();

    if (!experience) {
        throw new ApiError('Experience not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(experience, 'Experience retrieved successfully')
    );
});

// PUT /api/experiences/[id] - Update experience
export const PUT = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const experience = await Experience.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    );

    if (!experience) {
        throw new ApiError('Experience not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(experience, 'Experience updated successfully')
    );
});

// DELETE /api/experiences/[id] - Delete experience
export const DELETE = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    const experience = await Experience.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!experience) {
        throw new ApiError('Experience not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(null, 'Experience deleted successfully')
    );
});
