"use server";

export type ContactState = {
  success: boolean;
  error: string | null;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const businessType = formData.get("businessType") as string;
  const message = formData.get("message") as string;

  if (!name || !email) {
    return { success: false, error: "Vyplňte prosím jméno a email." };
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "BoostMail Web <web@boostmail.cz>",
        to: "nerad@boostmail.cz",
        subject: `Nový kontakt: ${name} (${businessType})`,
        text: `Jméno: ${name}\nEmail: ${email}\nTyp: ${businessType}\nZpráva: ${message || "—"}`,
        replyTo: email,
      });
    } else {
      console.log("Contact form submission:", { name, email, businessType, message });
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "Něco se pokazilo. Zkuste to prosím znovu." };
  }
}
