import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
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

// GET /api/projects - Get all projects
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const tags = searchParams.get('tags');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;

    // For admin dashboard, fetch all projects; for public API, limit to specified amount
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam), 10000) : 10000;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true };

    if (featured === 'true') {
        query.featured = true;
    }

    if (tags) {
        query.tags = { $in: tags.split(',') };
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    // Execute query with pagination
    const [projects, total] = await Promise.all([
        Project.find(query)
            .sort({ featured: -1, order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Project.countDocuments(query)
    ]);

    const response = ApiResponse.success(projects, 'Projects retrieved successfully');
    response.pagination = {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    };

    return NextResponse.json(response);
});

// POST /api/projects - Create new project (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.image) {
        throw new ApiError('Title, description, and image are required', 400);
    }

    const project = await Project.create(body);

    return NextResponse.json(
        ApiResponse.created(project, 'Project created successfully'),
        { status: 201 }
    );
});
