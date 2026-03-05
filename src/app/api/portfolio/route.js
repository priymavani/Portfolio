import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Skill from '@/models/Skill';
import Certificate from '@/models/Certificate';
import Hackathon from '@/models/Hackathon';
import MyDetail from '@/models/MyDetail';
import Stats from '@/models/Stats';

// GET /api/portfolio - Aggregated endpoint: returns ALL portfolio data in a single request
export async function GET() {
    try {
        await connectDB();

        // Fetch everything in parallel - single DB connection, all queries at once
        const [skills, certificates, hackathons, profile, githubStats, leetcodeStats] = await Promise.all([
            Skill.find({ isActive: true }).sort({ order: 1 }).lean(),
            Certificate.find({ isActive: true }).sort({ order: 1, issueDate: -1 }).lean(),
            Hackathon.find({ isActive: true }).sort({ order: 1 }).lean(),
            MyDetail.findOne({ isActive: true }).lean(),
            Stats.findOne({ platform: 'github', isLatest: true }).sort({ fetchedAt: -1 }).lean(),
            Stats.findOne({ platform: 'leetcode', isLatest: true }).sort({ fetchedAt: -1 }).lean(),
        ]);

        // Build social links object from profile
        const socialLinks = {};
        if (profile?.socialLinks) {
            profile.socialLinks.forEach(link => {
                socialLinks[link.platform.toLowerCase()] = link.url;
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                skills,
                certificates,
                hackathons,
                profile: profile || null,
                socialLinks,
                stats: {
                    github: githubStats?.data || null,
                    leetcode: leetcodeStats?.data || null,
                },
            }
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            }
        });
    } catch (error) {
        console.error('Portfolio API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch portfolio data' },
            { status: 500 }
        );
    }
}
