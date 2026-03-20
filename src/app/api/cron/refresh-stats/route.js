import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Stats from '@/models/Stats';

const GITHUB_USERNAME = "priymavani";
const LEETCODE_USERNAME = "Priy_mavani";

// CRON JOB ENDPOINT - Call this every 6 hours
// POST /api/cron/refresh-stats
export async function POST(request) {
    return handleRefreshStats(request);
}

async function handleRefreshStats(request) {
    try {
        // Optional: Add authentication to prevent unauthorized calls
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET || 'your-secret-key-here';

        if (authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        console.log('🔄 Cron job started: Refreshing stats...');

        const results = {
            github: { success: false, error: null },
            leetcode: { success: false, error: null }
        };

        // Fetch GitHub Stats (with retry and error handling)
        try {
            const githubData = await fetchGitHubStats();

            // Mark previous GitHub stats as not latest
            await Stats.updateMany(
                { platform: 'github', isLatest: true },
                { $set: { isLatest: false } }
            );

            // Save new GitHub stats
            await Stats.create({
                platform: 'github',
                username: GITHUB_USERNAME,
                data: githubData,
                isLatest: true,
                fetchedAt: new Date()
            });

            results.github.success = true;
            console.log('✅ GitHub stats saved');
        } catch (error) {
            results.github.error = error.message;
            console.error('❌ GitHub fetch failed:', error.message);
            // Continue anyway - don't let GitHub failure stop LeetCode
        }

        // Fetch LeetCode Stats (with multiple API fallbacks)
        try {
            const leetcodeData = await fetchLeetCodeStats();

            // Mark previous LeetCode stats as not latest
            await Stats.updateMany(
                { platform: 'leetcode', isLatest: true },
                { $set: { isLatest: false } }
            );

            // Save new LeetCode stats
            await Stats.create({
                platform: 'leetcode',
                username: LEETCODE_USERNAME,
                data: leetcodeData,
                isLatest: true,
                fetchedAt: new Date()
            });

            results.leetcode.success = true;
            console.log('✅ LeetCode stats saved');
        } catch (error) {
            results.leetcode.error = error.message;
            console.error('❌ LeetCode fetch failed:', error.message);
            // Continue anyway
        }

        // Check if at least one succeeded
        const anySuccess = results.github.success || results.leetcode.success;
        const allSuccess = results.github.success && results.leetcode.success;

        if (!anySuccess) {
            // Both failed - return error but don't crash
            return NextResponse.json({
                success: false,
                message: 'Both APIs failed. Using cached data.',
                results,
                refreshedAt: new Date().toISOString()
            }, { status: 500 });
        }

        console.log(allSuccess ? '✅ All stats refreshed!' : '⚠️ Partial refresh completed');

        return NextResponse.json({
            success: true,
            message: allSuccess ? 'All stats refreshed successfully' : 'Partial refresh - some APIs failed',
            results,
            refreshedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Cron job error:', error);
        return NextResponse.json(
            {
                error: 'Failed to refresh stats',
                details: error.message
            },
            { status: 500 }
        );
    }
}

// Helper function to fetch GitHub stats with MULTIPLE API FALLBACKS
async function fetchGitHubStats() {
    const apis = [
        {
            name: 'GitHub Contributions API (Jogruber)',
            fetch: async () => {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
                    {
                        cache: 'no-store',
                        signal: AbortSignal.timeout(10000)
                    }
                );

                if (!response.ok) throw new Error(`API returned ${response.status}`);
                const data = await response.json();
                const currentYear = new Date().getUTCFullYear();
                const yearlyTotal = data.total?.[currentYear] ?? data.total?.[String(currentYear)];

                return {
                    total: yearlyTotal ?? data.total?.lastYear ?? 0,
                    contributions: data.contributions || []
                };
            }
        },
        {
            name: 'GitHub GraphQL API',
            fetch: async () => await fetchGitHubGraphQL(GITHUB_USERNAME)
        },
        {
            name: 'GitHub Scraper API',
            fetch: async () => {
                const response = await fetch(
                    `https://github-contributions.vercel.app/api/v1/${GITHUB_USERNAME}`,
                    { signal: AbortSignal.timeout(10000) }
                );

                if (!response.ok) throw new Error(`API returned ${response.status}`);
                const data = await response.json();

                return {
                    total: data.total || 0,
                    contributions: data.contributions || []
                };
            }
        }
    ];

    // Try each API in order until one succeeds
    for (const api of apis) {
        try {
            console.log(`Trying ${api.name}...`);
            const data = await api.fetch();
            console.log(`✅ ${api.name} succeeded!`);
            return data;
        } catch (error) {
            console.warn(`⚠️ ${api.name} failed:`, error.message);
            // Continue to next API
        }
    }

    // All APIs failed
    throw new Error('All GitHub APIs failed - all sources are down');
}

// GitHub GraphQL API (requires no authentication for public data)
async function fetchGitHubGraphQL(username) {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Portfolio-Stats-Fetcher'
        },
        body: JSON.stringify({
            query: query,
            variables: { username }
        }),
        signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
        throw new Error(`GraphQL API returned ${response.status}`);
    }

    const result = await response.json();

    if (result.errors || !result.data?.user) {
        throw new Error('User not found or invalid response');
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;

    // Transform to match expected format
    const contributions = [];
    calendar.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            contributions.push({
                date: day.date,
                count: day.contributionCount,
                level: getContributionLevel(day.contributionCount)
            });
        });
    });

    return {
        total: calendar.totalContributions,
        contributions: contributions
    };
}

// Helper to calculate contribution level (0-4)
function getContributionLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}

// Helper function to fetch LeetCode stats with MULTIPLE API FALLBACKS
async function fetchLeetCodeStats() {
    const apis = [
        {
            name: 'LeetCode GraphQL (Official)',
            fetch: async () => await fetchLeetCodeGraphQL(LEETCODE_USERNAME)
        },
        {
            name: 'Alfa LeetCode API',
            fetch: async () => {
                const response = await fetch(
                    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`,
                    { signal: AbortSignal.timeout(10000) }
                );
                if (!response.ok) throw new Error(`API returned ${response.status}`);
                const data = await response.json();
                return {
                    total: data.solvedProblem || 0,
                    easy: data.easySolved || 0,
                    medium: data.mediumSolved || 0,
                    hard: data.hardSolved || 0
                };
            }
        },
        {
            name: 'LeetCode Stats API (Heroku)',
            fetch: async () => {
                const response = await fetch(
                    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
                    { signal: AbortSignal.timeout(10000) }
                );
                if (!response.ok) throw new Error(`API returned ${response.status}`);
                const data = await response.json();
                return {
                    total: data.totalSolved || 0,
                    easy: data.easySolved || 0,
                    medium: data.mediumSolved || 0,
                    hard: data.hardSolved || 0
                };
            }
        }
    ];

    // Try each API in order until one succeeds
    for (const api of apis) {
        try {
            console.log(`Trying ${api.name}...`);
            const data = await api.fetch();
            console.log(`✅ ${api.name} succeeded!`);
            return data;
        } catch (error) {
            console.warn(`⚠️ ${api.name} failed:`, error.message);
            // Continue to next API
        }
    }

    // All APIs failed
    throw new Error('All LeetCode APIs failed - all sources are down');
}

// LeetCode Official GraphQL API
async function fetchLeetCodeGraphQL(username) {
    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({
            query: query,
            variables: { username }
        }),
        signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
        throw new Error(`GraphQL API returned ${response.status}`);
    }

    const result = await response.json();

    if (!result.data?.matchedUser) {
        throw new Error('User not found or invalid response');
    }

    const stats = result.data.matchedUser.submitStats.acSubmissionNum;

    return {
        total: stats.find(s => s.difficulty === 'All')?.count || 0,
        easy: stats.find(s => s.difficulty === 'Easy')?.count || 0,
        medium: stats.find(s => s.difficulty === 'Medium')?.count || 0,
        hard: stats.find(s => s.difficulty === 'Hard')?.count || 0
    };
}
