import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Stats from '@/models/Stats';

// GET /api/stats - Get cached stats from database
export async function GET() {
  try {
    await connectDB();

    // Get latest GitHub stats
    const githubStats = await Stats.findOne({
      platform: 'github',
      isLatest: true
    })
      .sort({ fetchedAt: -1 })
      .lean();

    // Get latest LeetCode stats
    const leetcodeStats = await Stats.findOne({
      platform: 'leetcode',
      isLatest: true
    })
      .sort({ fetchedAt: -1 })
      .lean();

    // If no cached data, return error
    if (!githubStats || !leetcodeStats) {
      return NextResponse.json({
        error: 'No cached stats available. Please wait for the cron job to run.',
        note: 'Call POST /api/cron/refresh-stats to manually refresh'
      }, { status: 404 });
    }

    // Return cached data
    return NextResponse.json({
      github: githubStats.data,
      leetcode: leetcodeStats.data,
      _cache: {
        githubCachedAt: githubStats.fetchedAt,
        leetcodeCachedAt: leetcodeStats.fetchedAt,
        githubAge: Math.floor((Date.now() - new Date(githubStats.fetchedAt).getTime()) / 1000 / 60), // minutes
        leetcodeAge: Math.floor((Date.now() - new Date(leetcodeStats.fetchedAt).getTime()) / 1000 / 60) // minutes
      }
    });

  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cached stats", details: error.message },
      { status: 500 }
    );
  }
}