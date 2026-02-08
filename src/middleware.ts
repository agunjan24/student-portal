import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "quiz-prep-auth";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

async function computeHmac(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function validateCookie(value: string): Promise<boolean> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;

  const parts = value.split(":");
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;

  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age > COOKIE_MAX_AGE_MS) return false;

  const expected = await computeHmac(secret, timestamp);
  return hmac === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page, API login route, static files, and Next.js internals
  if (
    pathname === "/login" ||
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/logout" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/uploads/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|pdf|webp|gif)$/)
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(AUTH_COOKIE);
  if (!cookie || !(await validateCookie(cookie.value))) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
