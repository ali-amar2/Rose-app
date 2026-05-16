import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const handleI18nRouting = createMiddleware(routing);

const authPages = ["/login", "/register", "/forgot-password"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;

  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
    routing.defaultLocale;

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const isPublicPage =
    pathnameWithoutLocale === "/" || authPages.includes(pathnameWithoutLocale);

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (token && authPages.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (pathnameWithoutLocale.startsWith("/dashboard")) {
    const userRole = (token as { role?: "admin" | "user" })?.role;

    if (userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/${locale}/not-authorized`, req.url)
      );
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
