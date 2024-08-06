import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();

        const users = await prisma?.user.findMany();

        if (users)
        {
            prisma.$disconnect();
            return NextResponse.json({status:200, body:users});
        }
    }
    catch(err)
    {
        console.log(`[ERROR] ${err}`);
       
        return NextResponse.json({status:500, error:err})
    }
}