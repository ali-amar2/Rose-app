import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next-Intl middleware handler
const handleI18nRouting = createMiddleware(routing);

export default function middleware(req) {
  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
