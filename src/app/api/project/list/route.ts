
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { meetings, user } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { desc, eq, isNull, isNotNull, and } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { searchParams } = new URL(req.url);
    const privacy = searchParams.get('privacy'); // 'public' | 'private'

    let result;

    if (privacy === 'private') {
        if (!session?.user) {
             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Private feeds: Created by me AND has a privacy key (not null)
        // OR just "created by me"? usually private means strictly private.
        // Let's stick to: "My Private Feeds" = Created by me AND meetingPrivacy IS NOT NULL.
        result = await db.select({
            id: meetings.id,
            title: meetings.name,
            description: meetings.summary, 
            startTime: meetings.startTime,
            duration: meetings.duration,
            status: meetings.status,
            createdAt: meetings.createdAt,
            authorName: user.name,
            meetingPrivacy: meetings.meetingPrivacy
        })
        .from(meetings)
        .leftJoin(user, eq(meetings.createdBy, user.id))
        .where(
            and(
                eq(meetings.createdBy, session.user.id),
                isNotNull(meetings.meetingPrivacy) 
            )
        )
        .orderBy(desc(meetings.createdAt));

    } else {
        // Public feeds: meetingPrivacy IS NULL
        result = await db.select({
            id: meetings.id,
            title: meetings.name,
            description: meetings.summary,
            startTime: meetings.startTime,
            duration: meetings.duration,
            status: meetings.status,
            createdAt: meetings.createdAt,
            authorName: user.name,
            meetingPrivacy: meetings.meetingPrivacy
        })
        .from(meetings)
        .leftJoin(user, eq(meetings.createdBy, user.id))
        .where(isNull(meetings.meetingPrivacy))
        .orderBy(desc(meetings.createdAt));
    }

    // Format data for frontend (handle null author name if any, though schema says User.name is notNull)
    const formattedData = result.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || "No description yet.",
        author: item.authorName || "Unknown",
        status: item.status,
        createdAt: item.createdAt,
        timeAgo: new Date(item.createdAt).toLocaleDateString(), // Simple formatting for now
        color: 'primary', // Default color for UI
        category: 'General' // Default category
    }));

    return NextResponse.json({ success: true, data: formattedData });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
