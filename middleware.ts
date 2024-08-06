import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    // console.log("Request URL: ", request.url);

    // // Extract the Authorization header
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader) {
    //     return NextResponse.json({ status: 401, message: "Access token missing!" }, { status: 401 });
    // }

    // // Extract the token from the Authorization header
    // const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    // try {
    //     // Verify the token
    //     const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    //     if (verified) {
    //         return NextResponse.next();
    //     } else {
    //         return NextResponse.json({ status: 401, message: "Invalid token!" }, { status: 401 });
    //     }
    // } catch (err) {
    //     console.error('Error verifying token:', err);
    //     return NextResponse.json({ status: 500, message: "Server error!" }, { status: 500 });
    // }
}

// export const config = {
//     matcher: ['/api/operations/:path*','/^/(?!api/auth).*$']
 
// };
