import { NextResponse, type NextRequest } from "next/server";

/**
 * Site-wide HTTP Basic Auth.
 * Configure password via env BASIC_AUTH_PASSWORD on Vercel.
 * Default password (development only): "soulup" — change before publishing.
 *
 * Skipped paths: /_next, /favicon.ico, /api/health.
 */
export function middleware(request: NextRequest) {
  // Skip Next.js internals and public health
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/health") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|woff2?|ttf)$/i)
  ) {
    return NextResponse.next();
  }

  const expectedUser = process.env.BASIC_AUTH_USER || "boostmail";
  const expectedPass = process.env.BASIC_AUTH_PASSWORD || "soulup";

  const auth = request.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="boostmail.cz"' },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/health (public uptime check)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!api/health|_next/static|_next/image|favicon\\.ico).*)",
  ],
};
