import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// POST /api/auth/register - Register first admin user (one-time setup)
export const POST = asyncHandler(async (request) => {
    await connectDB();

    // Check if any user already exists
    const existingUser = await User.findOne();

    if (existingUser) {
        throw new ApiError('Admin user already exists. Registration is disabled.', 403);
    }

    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
        throw new ApiError('Please provide email, password, and name', 400);
    }

    if (password.length < 6) {
        throw new ApiError('Password must be at least 6 characters', 400);
    }

    // Create user
    const user = await User.create({
        email,
        password,
        name,
        role: 'admin'
    });

    return NextResponse.json(
        ApiResponse.created(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            'Admin user created successfully'
        ),
        { status: 201 }
    );
});
