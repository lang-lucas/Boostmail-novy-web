import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set([
  "/login",
  "/api/login",
  "/soul-up-emaily",
  "/api/health",
]);

const PUBLIC_PREFIXES = ["/_next/", "/api/health/", "/assets/", "/pages/"];
const PUBLIC_EXTENSIONS = /\.(png|jpg|jpeg|svg|webp|ico|woff2?|ttf|gif|css|js|jsx|map|json|html)$/i;

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  const expiry = parseInt(payload, 10);
  if (isNaN(expiry) || Date.now() > expiry) return false;

  const secret = process.env.AUTH_SECRET || "fallback-please-set-AUTH_SECRET";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const padded = sigB64.replace(/-/g, "+").replace(/_/g, "/");
  const sigBytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(payload));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths — login, soul-up report, static assets, .jsx components
  if (
    PUBLIC_PATHS.has(pathname) ||
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    PUBLIC_EXTENSIONS.test(pathname) ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth")?.value;
  if (await verifyToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
