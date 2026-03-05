import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Certificate from '@/models/Certificate';
import { ApiResponse, ApiError, asyncHandler } from '@/lib/apiUtils';

// GET /api/certificates/[id] - Get single certificate
export const GET = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const certificate = await Certificate.findById(id).lean();

    if (!certificate) {
        throw new ApiError('Certificate not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(certificate, 'Certificate retrieved successfully')
    );
});

// PUT /api/certificates/[id] - Update certificate
export const PUT = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    const certificate = await Certificate.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    );

    if (!certificate) {
        throw new ApiError('Certificate not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(certificate, 'Certificate updated successfully')
    );
});

// DELETE /api/certificates/[id] - Delete certificate
export const DELETE = asyncHandler(async (request, context) => {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    const certificate = await Certificate.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!certificate) {
        throw new ApiError('Certificate not found', 404);
    }

    return NextResponse.json(
        ApiResponse.success(null, 'Certificate deleted successfully')
    );
});
