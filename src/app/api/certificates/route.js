import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Certificate from '@/models/Certificate';
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

// GET /api/certificates - Get all certificates
export const GET = asyncHandler(async (request) => {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const issuer = searchParams.get('issuer');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 100);
    const skip = (page - 1) * limit;

    const query = { isActive: true };

    if (issuer) {
        query.issuer = { $regex: issuer, $options: 'i' };
    }

    const [certificates, total] = await Promise.all([
        Certificate.find(query)
            .sort({ order: 1, issueDate: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Certificate.countDocuments(query)
    ]);

    const response = ApiResponse.success(certificates, 'Certificates retrieved successfully');
    response.pagination = {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    };

    return NextResponse.json(response);
});

// POST /api/certificates - Create new certificate (Admin only)
export const POST = asyncHandler(async (request) => {
    await connectDB();
    await requireAdmin(request);

    const body = await request.json();

    if (!body.title || !body.issuer || !body.credentialId || !body.image || !body.credentialUrl) {
        throw new ApiError('Title, issuer, credentialId, image, and credentialUrl are required', 400);
    }

    const certificate = await Certificate.create(body);

    return NextResponse.json(
        ApiResponse.created(certificate, 'Certificate created successfully'),
        { status: 201 }
    );
});
