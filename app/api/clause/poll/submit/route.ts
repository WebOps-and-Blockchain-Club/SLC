import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type pollData = {
    clauseId:string,
    userId:string,
    option:string
}

export async function POST(request: NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();
        const body = await request.json();

        //add the user to the selected option in the clause
        const pollData:pollData = {
            clauseId:body.clauseId,
            userId:body.userId,
            option:body.option //ClausesFor, ClausesAgainst, ClausesAbstain
        }

        const mapping = {
            for:"ClausesFor",
            against:"ClausesAgainst",
            abstain:"ClausesAbstain"
        }

        //add the clause to the user
        const user = await prisma.user.update({
            where:{
                id:pollData.userId
            },
            data:
            {
                [pollData.option]:{
                    connect:{
                        id:pollData.clauseId
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