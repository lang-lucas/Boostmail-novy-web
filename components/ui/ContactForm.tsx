"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/kontakt/action";

const initialState: ContactState = { success: false, error: null };

const inputStyles =
  "w-full rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.success) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-lg font-semibold text-white">Děkujeme za zprávu!</p>
        <p className="mt-2 text-sm text-text-muted">
          Ozveme se vám do 24 hodin.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
          Jméno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputStyles}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputStyles}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <div>
        <label
          htmlFor="businessType"
          className="mb-2 block text-sm font-medium text-white"
        >
          Typ podnikání
        </label>
        <select
          id="businessType"
          name="businessType"
          className={inputStyles}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <option value="barbershop">Barbershop</option>
          <option value="klinika">Klinika</option>
          <option value="kosmetika">Kosmetický salón</option>
          <option value="wellness">Wellness</option>
          <option value="other">Jiné</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
          Zpráva (volitelné)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputStyles}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <button type="submit" className="neon-button w-full justify-center py-3.5 text-base">
        {isPending ? "Odesílám..." : "Odeslat zprávu →"}
      </button>
    </form>
  );
}
