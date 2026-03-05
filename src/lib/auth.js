import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRE = '7d'; // Token expires in 7 days

// Generate JWT token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Extract token from request
export const getTokenFromRequest = (request) => {
    const authHeader = request.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Also check cookies
    const cookies = request.headers.get('cookie');
    if (cookies) {
        const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('token='));
        if (tokenCookie) {
            return tokenCookie.split('=')[1];
        }
    }

    return null;
};

// Verify if user is authenticated
export const isAuthenticated = async (request) => {
    const token = getTokenFromRequest(request);

    if (!token) {
        return { authenticated: false, user: null };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return { authenticated: false, user: null };
    }

    return { authenticated: true, userId: decoded.id };
};
