import Image from "next/image";
import Link from "next/link";
import { stats } from "@/lib/goals";
import { projects } from "@/lib/projects";
import StoryTimeline from "@/components/StoryTimeline";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden px-6 pb-10 pt-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs text-inksoft">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo" /> Young builder · Telangana, India
            </span>
            <h1 className="font-display text-5xl leading-none text-indigo md:text-6xl">Vishwakesh</h1>
            <p className="mt-3 text-xl font-medium md:text-2xl">Building. Learning. Becoming.</p>
            <p className="mt-4 max-w-md text-inksoft">
              I&apos;m Vishwakesh, a young builder from Telangana, India. I&apos;m obsessed with technology,
              startups, AI, and creating things from scratch. I&apos;m still figuring everything out, but
              I&apos;m actively building toward the person I want to become.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-lg bg-indigo px-6 py-3 text-sm font-semibold text-white">
                View Projects →
              </Link>
              <Link href="/contact" className="rounded-lg border border-indigo px-6 py-3 text-sm font-semibold text-indigo">
                Get in Touch
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="card rounded-xl px-4 py-2.5">
                  <b className="block text-lg">{s.value}</b>
                  <span className="text-xs text-inksoft">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-self-center">
            <div
              className="rounded-full p-1.5"
              style={{ background: "conic-gradient(from 180deg, rgb(var(--indigo)), transparent 60%, rgb(var(--indigo)))", boxShadow: "0 0 60px rgb(var(--indigo) / 0.35)" }}
            >
              <Image
                src="/profile/profile.png"
                alt="Vishwakesh"
                width={280}
                height={280}
                priority
                className="rounded-full border-[5px] border-cream object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* WHERE I'M FROM */}
      <section className="border-t border-line px-6 py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-9 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-inksoft"><span className="h-1.5 w-1.5 rounded-full bg-indigo" /> Where I&apos;m From</div>
            <h2 className="font-display text-3xl">Telangana, India</h2>
            <p className="mt-3 text-inksoft">Started with curiosity.</p>
            <p className="text-inksoft">Got obsessed with computers.</p>
            <p className="text-inksoft">Started building things.</p>
            <p className="text-inksoft">Now working toward something much bigger.</p>
          </div>
          <div className="card flex flex-col items-center rounded-2xl p-6">
            <svg viewBox="0 0 200 220" width="130">
              <path d="M60 10 L150 30 L170 90 L140 150 L120 200 L70 210 L40 160 L20 100 L30 50 Z" fill="none" stroke="rgb(var(--line) / 0.3)" strokeWidth="2" />
            </svg>
            <span className="relative h-3.5 w-3.5 rounded-full bg-indigo">
              <span className="absolute inset-[-8px] animate-ping rounded-full border-2 border-indigo" />
            </span>
            <p className="mt-3 text-sm text-inksoft">📍 Telangana, India — 17.3850° N, 78.4867° E</p>
          </div>
        </div>
      </section>

      {/* WHAT I WANT TO BECOME */}
      <section className="border-t border-line px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-2 flex items-center gap-2 text-xs text-inksoft"><span className="h-1.5 w-1.5 rounded-full bg-indigo" /> What I Want to Become</div>
          <h2 className="mb-6 font-display text-3xl">Four directions, one path</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["💼", "Entrepreneur", "Build companies and products that actually matter."],
              ["⌥", "Technologist", "Understand computers deeply, from software to AI."],
              ["◆", "Builder", "Turn ideas into real projects instead of leaving them as ideas."],
              ["✎", "Creator", "Create things across technology, design, content and media."]
            ].map(([icon, title, desc]) => (
              <div key={title} className="card rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo/10 text-indigo">{icon}</div>
                <h3 className="font-semibold">{title} →</h3>
                <p className="mt-1 text-sm text-inksoft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MY STORY + CURRENTLY */}
      <section className="border-t border-line px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-9 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-inksoft"><span className="h-1.5 w-1.5 rounded-full bg-indigo" /> My Story</div>
            <h2 className="mb-6 font-display text-3xl">How I got here</h2>
            <StoryTimeline />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-inksoft"><span className="h-1.5 w-1.5 rounded-full bg-indigo" /> Currently</div>
            <div className="card rounded-2xl p-1.5">
              {[
                ["📖", "Learning", "Full-stack development · AI · business · mathematics"],
                ["◇", "Building", "Personal projects · AI tools · startup ideas"],
                ["◎", "Exploring", "Design · automation · content · entrepreneurship"]
              ].map(([icon, title, desc], i, arr) => (
                <div key={title} className={`flex gap-3 p-4 ${i < arr.length - 1 ? "border-b border-line" : ""}`}>
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-indigo/10 text-indigo">{icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-xs text-inksoft">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="border-t border-line px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-inksoft"><span className="h-1.5 w-1.5 rounded-full bg-indigo" /> My Projects</div>
            <Link href="/projects" className="text-sm font-semibold text-indigo">View all projects →</Link>
          </div>
          <h2 className="mb-6 font-display text-3xl">Things I&apos;m building</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <div key={p.slug} className="card overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <div className="flex h-28 items-center justify-center bg-ink font-display text-lg font-semibold text-white">{p.title}</div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mb-3 text-sm text-inksoft">{p.description}</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded-full bg-indigo/10 px-2.5 py-0.5 text-xs text-indigo">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
