// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Pre‑encode your secret
const TOKEN_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, TOKEN_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 1) Public routes: always allow
  const publicPaths = ["/", "/about", "/contact", "/login", "/signup"];
  if (publicPaths.includes(pathname)) {
    // But if they hit login/signup while already authenticated, send them to /account
    if ((pathname === "/login" || pathname === "/signup") && token) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
    return NextResponse.next();
  }

  // 2) Admin routes: require a valid token + isAdmin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const payload = await verifyToken(token);
    if (!payload || !payload.isAdmin) {
      // either invalid token or not an admin
      return NextResponse.redirect(new URL("/", request.url));
    }
    // inject a header for downstream handlers if needed
    const headers = new Headers(request.headers);
    headers.set("x-is-admin", "true");
    return NextResponse.next({ request: { headers } });
  }

  // 3) Any other route (e.g. /account or custom protected routes): require valid token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4) All checks passed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",            // home
    "/about",       // about
    "/contact",     // contact
    "/login",       // login
    "/signup",      // signup
    "/admin/:path*",// admin pages
    "/account/:path*" // protected user area (and any other you add)
  ],
};
