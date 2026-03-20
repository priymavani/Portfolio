import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Experience from '@/models/Experience';
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

// GET /api/experiences - Get all experiences
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const current = searchParams.get('current');

    const query = { isActive: true };

    if (current === 'true') {
        query.isCurrent = true;
    }

    const experiences = await Experience.find(query)
        .sort({ isCurrent: -1, startDate: -1 })
        .lean();

    return NextResponse.json(
        ApiResponse.success(experiences, 'Experiences retrieved successfully')
    );
});

// POST /api/experiences - Create new experience (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    if (!body.role || !body.company || !body.period || !body.description) {
        throw new ApiError('Role, company, period, and description are required', 400);
    }

    const experience = await Experience.create(body);

    return NextResponse.json(
        ApiResponse.created(experience, 'Experience created successfully'),
        { status: 201 }
    );
});
