import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// POST /api/auth/login - Login user
export const POST = asyncHandler(async (request) => {
    await connectDB();

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
        throw new ApiError('Please provide email and password', 400);
    }

    // Find user and include password
    const user = await User.findOne({ email, isActive: true }).select('+password');

    if (!user) {
        throw new ApiError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json(
        ApiResponse.success(
            {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                token
            },
            'Login successful'
        )
    );

    // Set cookie
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
});
