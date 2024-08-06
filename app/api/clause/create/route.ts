import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";


type ClauseCreationData = {
    title:string;
    description?:string;
    meetingId:string;
}

export async function POST(request: NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();
        const body = await request.json();

        const clauseData:ClauseCreationData = {
            title:body.title,
            description:body.description,
            meetingId:body.meetingId,
        }

        const clause = await prisma.clauses.create({
            data:clauseData
        })

        prisma.$disconnect();
        return NextResponse.json({message:"Clause created successfully", clause:clause}, {status:201});

    }

    catch(err)
    {
        console.log(`[ERROR] ${err}`);
        return NextResponse.json({message:"An error occurred while creating the clause"}, {status:500});
    }
}