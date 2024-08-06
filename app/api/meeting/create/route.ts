/**
 * Creates a new meeting.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the response data.
 */
import { Meeting, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type MeetingCreationData = {
  title: string;
  description?: string;
  date: Date;
};

export async function POST(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const body = await request.json();
    const data: MeetingCreationData = {
      title: body.title,
      date: new Date(),
      description: body.description ? body.description : null,
    };
    const meeting: Meeting = await prisma.meeting.create({
      data: data,
    });

    prisma.$disconnect();
    return NextResponse.json(
      { message: "Meeting created successfully", meeting },
      { status: 201 }
    );
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    return NextResponse.json(
      { message: "Error creating meeting", err },
      { status: 500 }
    );
  }
}