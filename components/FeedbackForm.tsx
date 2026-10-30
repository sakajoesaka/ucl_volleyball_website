"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

const fieldClasses =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-lilac/40";

export function FeedbackForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // TODO: plug in a form service here (e.g. Formspree, Basin or a Vercel function that
    // sends email) so messages arrive without opening the visitor's email app.
    // Replace the three lines below with a fetch() POST of { name, email, message }.
    const subject = `Website feedback from ${name}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-medium">
          First name
          <input name="firstName" required autoComplete="given-name" className={fieldClasses} />
        </label>
        <label className="block font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClasses} />
        </label>
      </div>
      <label className="block font-medium">
        Message
        <textarea name="message" required rows={5} className={`${fieldClasses} resize-y`} />
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-7 whitespace-nowrap py-3 font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <Send className="size-4" aria-hidden="true" />
          Send Message
        </button>
        <p className="text-sm text-muted">This opens your email app with your message ready to send.</p>
      </div>
      <p role="status" className="text-sm font-medium text-brand">
        {sent && (
          <>
            Your email app should now be open. If nothing happened, email us at{" "}
            <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-2">
              {site.contactEmail}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
