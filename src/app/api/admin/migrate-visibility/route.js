import connectDB from '@/lib/database';
import Project from '@/models/Project';
import Hackathon from '@/models/Hackathon';
import Certificate from '@/models/Certificate';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request) {
    try {
        // Check authentication
        const { authenticated } = await isAuthenticated(request);
        if (!authenticated) {
            return Response.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Connect to database
        await connectDB();

        // Update all Projects
        const projectsResult = await Project.updateMany(
            { visibility: { $exists: false } },
            { $set: { visibility: true } }
        );

        // Update all Hackathons
        const hackathoonsResult = await Hackathon.updateMany(
            { visibility: { $exists: false } },
            { $set: { visibility: true } }
        );

        // Update all Certificates
        const certificatesResult = await Certificate.updateMany(
            { visibility: { $exists: false } },
            { $set: { visibility: true } }
        );

        return Response.json(
            {
                success: true,
                message: 'Migration completed',
                data: {
                    projectsUpdated: projectsResult.modifiedCount,
                    hackathoonsUpdated: hackathoonsResult.modifiedCount,
                    certificatesUpdated: certificatesResult.modifiedCount,
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Migration error:', error);
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
