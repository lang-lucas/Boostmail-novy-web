import { NextResponse } from "next/server";

const COOKIE_NAME = "auth";
const MAX_AGE_SEC = 30 * 24 * 60 * 60; // 30 days

function isSafeRedirect(target: string | null): string {
  if (!target || !target.startsWith("/") || target.startsWith("//")) return "/";
  return target;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const password = String(formData.get("password") ?? "");
  const redirect = isSafeRedirect(formData.get("redirect") as string | null);
  const expected = process.env.SITE_PASSWORD || "Boost2026";

  if (!password || password !== expected) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "1");
    if (redirect && redirect !== "/") url.searchParams.set("redirect", redirect);
    return NextResponse.redirect(url, 303);
  }

  // Sign session token (HMAC-SHA256 over expiry timestamp)
  const secret = process.env.AUTH_SECRET || "fallback-please-set-AUTH_SECRET";
  const expiry = Date.now() + MAX_AGE_SEC * 1000;
  const payload = String(expiry);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sigBytes = new Uint8Array(sigBuf);
  let bin = "";
  for (let i = 0; i < sigBytes.length; i++) bin += String.fromCharCode(sigBytes[i]);
  const sigB64 = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  const res = NextResponse.redirect(new URL(redirect, req.url), 303);
  res.cookies.set(COOKIE_NAME, `${payload}.${sigB64}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
    path: "/",
  });
  return res;
}
