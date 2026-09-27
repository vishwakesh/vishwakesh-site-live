import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

export const metadata = {
  metadataBase: new URL("https://vishwakesh.space"),
  title: {
    default: "Vishwakesh — Building. Learning. Becoming.",
    template: "%s — Vishwakesh"
  },
  description:
    "Vishwakesh is a young builder from Telangana, India, obsessed with technology, startups, AI, and creating things from scratch.",
  openGraph: {
    title: "Vishwakesh",
    description: "Building. Learning. Becoming.",
    url: "https://vishwakesh.space",
    siteName: "Vishwakesh",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishwakesh",
    description: "Building. Learning. Becoming."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before paint so there's no light-mode flash for users with saved dark preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('vk-theme');
                const wantsDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (wantsDark) document.documentElement.classList.add('dark');
              } catch (e) {}
            `
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
