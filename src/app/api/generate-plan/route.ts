import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generateStudyPlan } from '../../../lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, syllabus, totalDays, hoursPerDay } = body;

    console.log('Request received:', { title, totalDays, hoursPerDay }); // Debug

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser?.emailAddresses?.[0]?.emailAddress || '',
          name: clerkUser?.firstName || '',
        },
      });
    }

    console.log('Generating AI plan...'); // Debug

    // Generate AI study plan
    const aiPlan = await generateStudyPlan(syllabus, totalDays, hoursPerDay);

    console.log('AI plan generated:', aiPlan); // Debug

    // Create study plan in database
    const studyPlan = await prisma.studyPlan.create({
      data: {
        userId: user.id,
        title,
        syllabus,
        totalDays,
        hoursPerDay,
        cards: {
          create: aiPlan.days.map((day: any) => ({
            dayNumber: day.dayNumber,
            topics: day.topics,
            subtasks: day.subtasks,
            estimatedTime: day.estimatedTime,
            hasRevision: day.hasRevision || false,
            revisionTopics: day.revisionTopics || [],
          })),
        },
      },
    });

    console.log('Study plan created:', studyPlan.id); // Debug

    return NextResponse.json({ planId: studyPlan.id });
  } catch (error: any) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate study plan' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
    }

    const plan = await prisma.studyPlan.findUnique({
      where: { id: planId },
      include: {
        cards: {
          orderBy: { dayNumber: 'asc' },
        },
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}
