import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const response = await createMiddleware(routing)(request);

  // 2. Get the user token from NextAuth to check authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Pages that should NOT be accessible to logged-in users
  const authPages = ["/login", "/register", "/forgot-password"];
  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // TODO: ADD the Protected pages that require the user to be logged in
  const protectedPages = ["/1", "/2"];
  if (protectedPages.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
