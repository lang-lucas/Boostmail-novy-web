import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Přístup pouze pro autorizované uživatele.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string; redirect?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "1";
  const redirect = params?.redirect ?? "/";

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 sm:p-10">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
              <Lock className="h-5 w-5 text-primary" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold tracking-tight">BoostMail</h1>
          <p className="mt-2 text-center text-sm text-text-muted">Vlož přístupový kód</p>

          <form method="POST" action="/api/login" className="mt-7 space-y-4">
            {redirect && redirect !== "/" && (
              <input type="hidden" name="redirect" value={redirect} />
            )}

            <div>
              <input
                type="password"
                name="password"
                placeholder="kód"
                autoFocus
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-text-dimmed focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {hasError && (
                <p className="mt-2 text-sm text-red-400">Špatný kód, zkus to znovu.</p>
              )}
            </div>

            <button type="submit" className="neon-button w-full justify-center py-3">
              Vstoupit
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-text-dimmed">
          BoostMail · interní přístup
        </p>
      </div>
    </div>
  );
}
