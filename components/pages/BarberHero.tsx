"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function BarberHero() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl leading-tight md:text-7xl"
        >
          Plný kalendář.
          <br />
          <span className="text-brand">Bez reklam. Automaticky.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary"
        >
          Napojíme se na váš Reservio a automaticky vracíme zákazníky, kteří by
          jinak nepřišli. Vy stříháte, my plníme kalendář.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Button href="/kontakt" size="lg">
            Napojte svůj barbershop
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
