import Link from "next/link";
import { social } from "@/lib/goals";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5">
        <span className="font-display font-semibold text-indigo">VISHWAKESH</span>
        <ul className="flex flex-wrap gap-5 text-sm text-inksoft">
          <li><Link href="/">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/goals">Goals</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="flex gap-3">
          <a href={social.github} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-inksoft" aria-label="GitHub">GH</a>
          <a href={social.youtube} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-inksoft" aria-label="YouTube">YT</a>
          <a href={social.discord} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-inksoft" aria-label="Discord">DC</a>
          <a href={`mailto:${social.email}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-inksoft" aria-label="Email">✉</a>
        </div>
      </div>
      <p className="mt-6 text-center font-display italic text-inksoft">Still building.</p>
    </footer>
  );
}
