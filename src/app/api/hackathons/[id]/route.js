import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Hackathon from '@/models/Hackathon';
import Project from '@/models/Project';
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

// GET /api/hackathons/[id] - Get single hackathon
export const GET = asyncHandler(async (request, { params }) => {
    await connectDB();

    const hackathon = await Hackathon.findById(params.id);

    if (!hackathon) {
        throw new ApiError('Hackathon not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(hackathon, 'Hackathon retrieved successfully')
    );
});

// PUT /api/hackathons/[id] - Update hackathon
export const PUT = asyncHandler(async (request, { params }) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    // Validate required fields
    if (body.title !== undefined && !body.title) {
        throw new ApiError('Title cannot be empty', 400);
    }

    if (body.images !== undefined && (!body.images || body.images.length === 0)) {
        throw new ApiError('At least one image is required', 400);
    }

    // NEW: Handle stages-based updates
    if (body.stages && body.stages.length > 0) {
        // Populate project details for each stage if projectRef is provided
        for (let i = 0; i < body.stages.length; i++) {
            if (body.stages[i].projectRef) {
                const project = await Project.findById(body.stages[i].projectRef);
                if (project) {
                    body.stages[i].projectName = project.title;
                    body.stages[i].projectLink = project.github || project.link || '';
                }
            }
        }
    }

    // OLD: Handle pipeline-based updates (backward compatibility)
    if (body.pipeline) {
        // If online projectRef is provided, fetch project details
        if (body.pipeline?.online?.projectRef) {
            const project = await Project.findById(body.pipeline.online.projectRef);
            if (project) {
                body.pipeline.online.projectName = project.title;
                body.pipeline.online.projectLink = project.github || project.link;
            }
        }

        // If offline projectRef is provided and status is not Skipped, fetch project details
        if (body.pipeline?.offline?.status && body.pipeline.offline.status !== 'Skipped') {
            if (body.pipeline.offline.projectRef) {
                const project = await Project.findById(body.pipeline.offline.projectRef);
                if (project) {
                    body.pipeline.offline.projectName = project.title;
                    body.pipeline.offline.projectLink = project.github || project.link;
                }
            }
        }
    }

    const hackathon = await Hackathon.findByIdAndUpdate(
        params.id,
        body,
        { new: true, runValidators: true }
    );

    if (!hackathon) {
        throw new ApiError('Hackathon not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(hackathon, 'Hackathon updated successfully')
    );
});

// DELETE /api/hackathons/[id] - Soft delete hackathon
export const DELETE = asyncHandler(async (request, { params }) => {
    await connectDB();
    await requireAdmin(request);

    const hackathon = await Hackathon.findByIdAndUpdate(
        params.id,
        { isActive: false },
        { new: true }
    );

    if (!hackathon) {
        throw new ApiError('Hackathon not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(null, 'Hackathon deleted successfully')
    );
});
