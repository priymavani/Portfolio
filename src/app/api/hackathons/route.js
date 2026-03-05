import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Hackathon from '@/models/Hackathon';
import Project from '@/models/Project';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// GET /api/hackathons - Get all hackathons
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam), 10000) : 10000;
    const skip = (page - 1) * limit;

    // Build query - only active hackathons
    const query = { isActive: true };

    // Execute query with pagination
    const [hackathons, total] = await Promise.all([
        Hackathon.find(query)
            .sort({ order: 1, date: -1 }) // Ascending order, descending date
            .skip(skip)
            .limit(limit)
            .lean(),
        Hackathon.countDocuments(query)
    ]);

    const response = ApiResponse.success(hackathons, 'Hackathons retrieved successfully');
    response.pagination = {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    };

    return NextResponse.json(response);
});

// POST /api/hackathons - Create new hackathon (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.date) {
        throw new ApiError('Title and date are required', 400);
    }

    if (!body.images || body.images.length === 0) {
        throw new ApiError('At least one image is required', 400);
    }

    // NEW: Handle stages-based hackathons
    if (body.stages && body.stages.length > 0) {
        // Validate stages
        for (let i = 0; i < body.stages.length; i++) {
            const stage = body.stages[i];

            if (!stage.stageType) {
                throw new ApiError(`Stage ${i + 1}: Type is required`, 400);
            }

            if (!stage.mode) {
                throw new ApiError(`Stage ${i + 1}: Mode is required`, 400);
            }

            // Location required for offline/in-person/hybrid modes
            if (['in-person', 'hybrid', 'offline'].includes(stage.mode) && !stage.location) {
                throw new ApiError(`Stage ${i + 1}: Location is required for ${stage.mode} mode`, 400);
            }

            if (!stage.status) {
                throw new ApiError(`Stage ${i + 1}: Status is required`, 400);
            }

            // Populate project details if projectRef is provided
            if (stage.projectRef) {
                const project = await Project.findById(stage.projectRef);
                if (project) {
                    body.stages[i].projectName = project.title;
                    body.stages[i].projectLink = project.github || project.link || '';
                }
            }
        }

        // Ensure finalStatus is set
        if (!body.finalStatus) {
            body.finalStatus = 'participated';
        }
    }
    // OLD: Handle pipeline-based hackathons (backward compatibility)
    else if (body.pipeline) {
        // Validate online pipeline
        if (!body.pipeline?.online?.duration || !body.pipeline?.online?.projectTitle) {
            throw new ApiError('Online stage duration and project title are required', 400);
        }

        // If projectRef is provided, fetch project details
        if (body.pipeline.online.projectRef) {
            const project = await Project.findById(body.pipeline.online.projectRef);
            if (project) {
                body.pipeline.online.projectName = project.title;
                body.pipeline.online.projectLink = project.github || project.link;
            }
        }

        // Validate offline pipeline if not skipped
        if (body.pipeline?.offline?.status && body.pipeline.offline.status !== 'Skipped') {
            if (!body.pipeline.offline.location || !body.pipeline.offline.duration || !body.pipeline.offline.projectTitle) {
                throw new ApiError('Offline stage requires location, duration, and project title', 400);
            }

            // If projectRef is provided, fetch project details
            if (body.pipeline.offline.projectRef) {
                const project = await Project.findById(body.pipeline.offline.projectRef);
                if (project) {
                    body.pipeline.offline.projectName = project.title;
                    body.pipeline.offline.projectLink = project.github || project.link;
                }
            }
        }
    } else {
        throw new ApiError('Either stages or pipeline is required', 400);
    }

    const hackathon = await Hackathon.create(body);

    return NextResponse.json(
        ApiResponse.created(hackathon, 'Hackathon created successfully'),
        { status: 201 }
    );
});
