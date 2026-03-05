import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { isAuthenticated } from '@/lib/auth';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// GET /api/auth/me - Get current user
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { authenticated, userId } = await isAuthenticated(request);

    if (!authenticated) {
        throw new ApiError('Not authenticated', 401);
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw new ApiError('User not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            'User retrieved successfully'
        )
    );
});
