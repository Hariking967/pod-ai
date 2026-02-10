
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { meetings, agents } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { nanoid } from 'nanoid';

const createSchema = z.object({
  name: z.string().min(1),
  startTime: z.string(),
  duration: z.number().int().positive().lt(120),
  actorPrompt: z.string().min(1),
  criticPrompt: z.string().min(1),
  isPublic: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = createSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.flatten() }, { status: 400 });
    }

    const { name, startTime, duration, actorPrompt, criticPrompt, isPublic } = result.data;
    
    const start = new Date(startTime);
    const now = new Date();

    if (start.getTime() < now.getTime() - 1000 * 60) {
       return NextResponse.json({ error: "Start time cannot be in the past" }, { status: 400 });
    }

    let status = "scheduled";
    if (start.getTime() <= now.getTime() + 1000 * 60 * 5) {
        status = "live"; 
    }

    const meetingId = nanoid();
    const actorId = nanoid();
    const criticId = nanoid();
    // Logic: If public, privacy key is null. If private, generate a UUID key.
    const meetingPrivacy = isPublic ? null : nanoid();

    // Transaction removed due to neon-http driver limitations
    await db.insert(meetings).values({
      id: meetingId,
      name,
      startTime: start,
      duration,
      status,
      meetingPrivacy,
      actorAgentId: actorId, 
      criticAgentId: criticId,
      createdBy: session.user.id,
    });

    await db.insert(agents).values({
      id: actorId,
      meetingId: meetingId,
      type: "actor",
      prompt: actorPrompt,
      createdBy: session.user.id,
    });

    await db.insert(agents).values({
      id: criticId,
      meetingId: meetingId,
      type: "critic",
      prompt: criticPrompt,
      createdBy: session.user.id,
    });

    return NextResponse.json({ success: true, meetingId });

  } catch (error) {
    console.error("Error creating podcast:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
