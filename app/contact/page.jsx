import { social } from "@/lib/goals";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl">Get in Touch</h1>
        <p className="mt-2 text-inksoft">Best way to reach me is email.</p>
        <a href={`mailto:${social.email}`} className="mt-6 inline-block rounded-lg bg-indigo px-6 py-3 text-sm font-semibold text-white">
          {social.email}
        </a>
        <div className="mt-8 flex justify-center gap-4">
          <a href={social.github} className="rounded-lg border border-line px-4 py-2 text-sm text-inksoft">GitHub</a>
          <a href={social.youtube} className="rounded-lg border border-line px-4 py-2 text-sm text-inksoft">YouTube</a>
          <a href={social.discord} className="rounded-lg border border-line px-4 py-2 text-sm text-inksoft">Discord</a>
        </div>
      </div>
    </section>
  );
}
