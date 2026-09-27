"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/goals", label: "Goals" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("vk-theme", next ? "dark" : "light");
    } catch (e) {}
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display font-semibold tracking-wide text-indigo">
          VISHWAKESH
        </Link>
        <ul className="hidden gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative py-1 text-sm ${
                  pathname === l.href ? "text-ink after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:rounded after:bg-indigo" : "text-inksoft"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink"
          >
            {dark ? "☀" : "◐"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            aria-expanded={open}
            className="text-xl text-ink md:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col border-t border-line bg-cream px-6 pb-4 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-3 text-base ${pathname === l.href ? "text-indigo" : "text-inksoft"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
