import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  /*on the frontend as the user tries to join a meeting, slc speaker gets notified, he checks whether the user is there or not and clicks the respective button, provide accept and dismiss buttons
    - on accepting ping this endpoint it will add that particular user to the meeting and the attendance will be  marked
    - or even if you call it anyway doesnt matter, it will just add the user to the meeting but you will need to develop the frontend for that.
    */

  try {
    const prisma = new PrismaClient();
    const body = await request.json();

    const joinData = {
      meetingId: body.meetingId,
      userId: body.userId,
    };

    //add the user to the meeting
    const activeUser = await prisma.user.findUnique({
      where: {
        rollNo: body.rollNo, //set this param to the request body.
      },
    });
    const isAdmin = activeUser?.type == "ADMIN" ? true : false;

    if (isAdmin)
    {
        const meeting = await prisma.meeting.update({
          where: {
            id: joinData.meetingId,
          },
          data: {
            attendes: {
              connect: {
                id: joinData.userId,
              },
            },
          },
        });

        return NextResponse.json(
        { message: "User joined the meeting successfully" },
        { status: 201 }
        );

    }
    else 
    {
        return NextResponse.json({message:"You are not authorized to mark the attendance."}, {status:401});
    }

  } catch (err) {}
}
