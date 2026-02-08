import { createHmac } from "crypto";
import { cookies } from "next/headers";

const AUTH_COOKIE = "quiz-prep-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET not set");
  return secret;
}

function getSitePassword(): string {
  const password = process.env.SITE_PASSWORD;
  if (!password) throw new Error("SITE_PASSWORD not set");
  return password;
}

function createHmacToken(timestamp: string): string {
  return createHmac("sha256", getSecret()).update(timestamp).digest("hex");
}

export function validatePassword(password: string): boolean {
  return password === getSitePassword();
}

export function createAuthCookie(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmacToken(timestamp);
  return `${timestamp}:${hmac}`;
}

export function validateAuthCookie(value: string): boolean {
  const parts = value.split(":");
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;

  // Check expiry (7 days)
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age > COOKIE_MAX_AGE * 1000) return false;

  // Validate HMAC
  const expected = createHmacToken(timestamp);
  return hmac === expected;
}

export async function setAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, createAuthCookie(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AUTH_COOKIE);
  if (!cookie) return false;
  return validateAuthCookie(cookie.value);
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
