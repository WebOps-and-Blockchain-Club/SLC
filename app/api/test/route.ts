import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();

        console.log("Connected to DB.");
    
        return NextResponse.json({message:"Connected to DB."});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({message:"Error connecting to DB."});
    }
}