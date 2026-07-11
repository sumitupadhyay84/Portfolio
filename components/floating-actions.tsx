"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { siteConfig } from "@/constants/site";

export function FloatingActions() {
  return (
    <>
      <Magnetic className="fixed bottom-[4.75rem] right-4 z-40 sm:bottom-[4.75rem] sm:right-6">
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
          className="group flex h-11 w-11 cursor-pointer items-center justify-center gap-0 overflow-hidden rounded-full border border-white/10 bg-zinc-900/90 text-emerald-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-350 ease-out hover:w-36 hover:gap-2.5 hover:bg-zinc-800 hover:text-emerald-300 sm:h-12 sm:w-12"
        >
          <svg className="h-4 w-4 shrink-0 fill-current sm:h-5 sm:w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="max-w-0 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest opacity-0 transition-all duration-350 ease-out group-hover:max-w-25 group-hover:opacity-100">
            WhatsApp
          </span>
        </a>
      </Magnetic>

      <Magnetic className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label="Download Resume"
          className="group flex h-11 w-11 cursor-pointer items-center justify-center gap-0 overflow-hidden rounded-full border border-white/10 bg-zinc-900/90 text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-355 ease-out hover:w-32 hover:gap-2.5 hover:bg-zinc-800 hover:text-white sm:h-12 sm:w-12"
        >
          <Download className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          <span className="max-w-0 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest opacity-0 transition-all duration-355 ease-out group-hover:max-w-20 group-hover:opacity-100">
            Resume
          </span>
        </a>
      </Magnetic>
    </>
  );
}

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const circumference = 2 * Math.PI * 20;
  const strokeOffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => setVisible(value > 0.02));
  }, [scrollYProgress]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5, pointerEvents: visible ? "auto" : "none" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-[8.5rem] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:text-white sm:bottom-36 sm:right-6 sm:h-12 sm:w-12"
      aria-label="Scroll to top"
    >
      <svg className="absolute h-12 w-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray: circumference, strokeDashoffset: strokeOffset }}
        />
      </svg>
      <span className="text-lg">↑</span>
    </motion.button>
  );
}
