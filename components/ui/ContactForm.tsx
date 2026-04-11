"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/kontakt/action";
import { Button } from "@/components/ui/Button";

const initialState: ContactState = { success: false, error: null };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center">
        <p className="text-lg text-text-primary">Děkujeme za zprávu!</p>
        <p className="mt-2 text-sm text-text-secondary">
          Ozveme se vám do 24 hodin.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-text-secondary">
          Jméno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-text-secondary">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      <div>
        <label
          htmlFor="businessType"
          className="mb-2 block text-sm text-text-secondary"
        >
          Typ podnikání
        </label>
        <select
          id="businessType"
          name="businessType"
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        >
          <option value="barbershop">Barbershop</option>
          <option value="klinika">Klinika</option>
          <option value="kosmetika">Kosmetický salón</option>
          <option value="wellness">Wellness</option>
          <option value="other">Jiné</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-text-secondary">
          Zpráva (volitelné)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-text-primary outline-none transition-colors focus:border-brand"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <Button type="submit" size="lg" className="w-full">
        {isPending ? "Odesílám..." : "Odeslat zprávu"}
      </Button>
    </form>
  );
}
