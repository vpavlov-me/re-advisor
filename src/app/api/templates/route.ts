import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, sections, isDraft } = body;

    const template = await prisma.constitutionTemplate.create({
      data: {
        title,
        description,
        sections,
        isDraft: isDraft ?? true,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const templates = await prisma.constitutionTemplate.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
