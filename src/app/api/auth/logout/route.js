import { NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/apiUtils';

// POST /api/auth/logout - Logout user
export async function POST(request) {
    const response = NextResponse.json(
        ApiResponse.success(null, 'Logout successful')
    );

    // Clear cookie
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0
    });

    return response;
}
