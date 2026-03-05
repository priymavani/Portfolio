// Custom API Error class
export class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Standardized API Response
export class ApiResponse {
    static success(data, message = 'Success', statusCode = 200) {
        return {
            success: true,
            statusCode,
            message,
            data
        };
    }

    static error(message, statusCode = 500, errors = null) {
        return {
            success: false,
            statusCode,
            error: {
                message,
                ...(errors && { errors })
            }
        };
    }

    static created(data, message = 'Created successfully') {
        return this.success(data, message, 201);
    }
}

// Async handler for Next.js route handlers
export const asyncHandler = (fn) => async (request, context) => {
    try {
        return await fn(request, context);
    } catch (error) {
        console.error('API Error:', error);

        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';

        return Response.json(
            ApiResponse.error(message, statusCode),
            { status: statusCode }
        );
    }
};
