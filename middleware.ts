import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

 const NO_AUTH_PAGE = ["/login", "/register", "/citas"].some((el) => el === path)

  if (!session && NO_AUTH_PAGE) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && NO_AUTH_PAGE) {
    return NextResponse.redirect(new URL("/citas", req.url));
  }

  return NextResponse.next();
}