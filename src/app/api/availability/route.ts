import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const slots = await prisma.availabilitySlot.findMany({
      orderBy: {
        dayOfWeek: 'asc',
      },
    });
    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slots } = body;

    if (!Array.isArray(slots)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Since SQLite doesn't support createMany efficiently with skipDuplicates, 
    // and we want to replace the schedule, we'll use a transaction.
    
    await prisma.$transaction(async (tx) => {
      // Clear existing recurring slots
      await tx.availabilitySlot.deleteMany({
        where: { isRecurring: true }
      });

      // Create new slots
      for (const slot of slots) {
        await tx.availabilitySlot.create({
          data: {
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isRecurring: true,
          }
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving availability:', error);
    return NextResponse.json({ error: 'Failed to save availability' }, { status: 500 });
  }
}
