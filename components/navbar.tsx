"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { navLinks, siteConfig } from "@/constants/site";

type Props = {
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function Navbar({ onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 w-full">
      <div
        className="relative flex w-full items-center justify-between px-4 py-3.5 transition-all duration-300 sm:px-6 sm:py-4 md:px-8 lg:px-10"
        style={{ pointerEvents: "auto" }}
      >
        <div
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to bottom, rgba(9, 9, 11, 0.7) 0%, rgba(9, 9, 11, 0) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 20%, rgba(0, 0, 0, 0.7) 50%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 20%, rgba(0, 0, 0, 0.7) 50%, transparent 100%)",
          }}
        />

        <Magnetic>
          <a href="#top" className="group relative z-10 flex items-center gap-2">
            <span className="font-sans text-sm font-semibold tracking-widest text-zinc-100 transition-colors duration-300 group-hover:text-cyan-400">
              {siteConfig.initials}
            </span>
          </a>
        </Magnetic>

        <Magnetic>
          <a
            href={`mailto:${siteConfig.email}`}
            className="relative z-10 hidden font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400 transition-colors duration-300 hover:text-zinc-100 lg:block"
          >
            {siteConfig.email}
          </a>
        </Magnetic>

        <nav className="relative z-10 flex flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Magnetic key={link.href}>
              <a
                href={link.href}
                onClick={(event) => onNavigate(event, link.href)}
                className="block cursor-pointer text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition-colors duration-300 hover:text-zinc-100 sm:text-[11px] md:text-sm"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>
      </div>
    </header>
  );
}
