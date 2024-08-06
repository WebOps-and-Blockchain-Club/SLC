import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();
        const body = await request.json();

        //add the user to the selected option in the clause
        const pollData = {
            clauseId:body.clauseId,
            userId:body.userId,
            option:body.option //for, abstain, against all small letters
        }

        //get the clause to add the user
        const clause = await prisma.clauses.update({
            where:{
                id:pollData.clauseId
            },
            data:{
                [pollData.option]:{
                    connect:{
                        id:pollData.userId
                    }
                }
            }
        })

        //also create a response for the user submission
        const pollResponse = await prisma.responses.create({
            data:{
                response:pollData.option,
                userId:pollData.userId,
                clausesId:pollData.clauseId
            }
        })
        prisma.$disconnect();
        return NextResponse.json({message:"Poll submitted successfully"}, {status:201});
    }

    catch(err)
    {
        console.log(`[ERROR] ${err}`);
        return NextResponse.json({message:"An error occurred while submitting the poll"}, {status:500});
    }
}