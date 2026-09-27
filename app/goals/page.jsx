import { goals } from "@/lib/goals";

export const metadata = { title: "Goals" };

export default function GoalsPage() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl">What I&apos;m Building Toward</h1>
        <p className="mt-2 text-inksoft">Not a vision board — just what I&apos;m actually working on.</p>
        <div className="mt-8 space-y-6">
          {goals.map((g) => (
            <div key={g.area} className="card rounded-2xl p-5">
              <h2 className="mb-2 font-semibold text-indigo">{g.area}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-inksoft">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
