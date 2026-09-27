import { projects } from "@/lib/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-4xl">Projects</h1>
        <p className="mt-2 max-w-md text-inksoft">Things I&apos;ve built, and things I&apos;m still building.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.slug} className="card overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
              <div className="flex h-32 items-center justify-center bg-ink font-display text-xl font-semibold text-white">{p.title}</div>
              <div className="p-5">
                <h2 className="font-semibold">{p.title}</h2>
                <p className="mb-3 text-sm text-inksoft">{p.description}</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-indigo/10 px-2.5 py-0.5 text-xs text-indigo">{t}</span>
                  ))}
                </div>
                {p.caseStudy ? (
                  <a href={p.caseStudy} className="text-sm font-semibold text-indigo">View case study →</a>
                ) : (
                  <span className="text-sm text-inksoft">Case study coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
