import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import MyDetail from '@/models/MyDetail';
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

// GET /api/my-details - Get active profile
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const profile = await MyDetail.findOne({ isActive: true }).lean();

    if (!profile) {
        throw new ApiError('Profile not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(profile, 'Profile retrieved successfully')
    );
});

// POST /api/my-details - Create profile (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    if (!body.name || !body.title || !body.description || !body.photo) {
        throw new ApiError('Name, title, description, and photo are required', 400);
    }

    // Deactivate any existing active profile
    await MyDetail.updateMany({ isActive: true }, { isActive: false });

    const profile = await MyDetail.create(body);

    return NextResponse.json(
        ApiResponse.created(profile, 'Profile created successfully'),
        { status: 201 }
    );
});

// PUT /api/my-details - Update active profile (Admin only)
export const PUT = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    const profile = await MyDetail.findOneAndUpdate(
        { isActive: true },
        body,
        { new: true, runValidators: true }
    );

    if (!profile) {
        throw new ApiError('Profile not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(profile, 'Profile updated successfully')
    );
});
