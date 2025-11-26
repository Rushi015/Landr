// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ⚡

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3000";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const searchParams = req.nextUrl.searchParams.toString();
  const pathWithSearchParams = `${pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  const publicRoutes = ["/", "/signin", "/signup"];
  const isPublic = publicRoutes.some((path) => pathname.startsWith(path));
  if (isPublic) return NextResponse.next();

  // ⚡ Fast cookie-based session check
  const cookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ✅ Detect subdomain
  const customSubDomain = hostname
    .split(BASE_DOMAIN)
    .filter(Boolean)[0]
    ?.replace(".", "");

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
