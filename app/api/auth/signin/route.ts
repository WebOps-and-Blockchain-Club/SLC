import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken"

import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest)
{
    try 
    {
        const prisma = new PrismaClient();
        const body = await request.json();
        console.log(body);
        //get the user
        const user = await prisma?.user.findUnique({
            where:
            {
                rollNo:body.rollNo,
            }
        })

        if (user?.password === body.password)
        {
            prisma.$disconnect();
            const token = jwt.sign({rollNo:user?.rollNo, type:user?.type, userId:user?.id}, process.env.JWT_SECRET as string, {expiresIn:process.env.MODE == "dev" ? "0" : "1h"});
            return NextResponse.json({status:200, token, message:"Login successful"},{status:200});
        }
        else 
        {
            prisma.$disconnect();
            return NextResponse.json({status:401, message:"Invalid credentials"}, {status:401});
        }
    }
    catch(err)
    {
        console.log(`[ERROR] ${err}`);
        return NextResponse.json({status:500, error:err},{status:500});
    }
}