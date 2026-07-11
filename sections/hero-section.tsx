"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { ThreePortrait } from "@/components/three-portrait";
import { siteConfig } from "@/constants/site";

const nameLetterVariants = {
  initial: { y: "0%", opacity: 1 },
  animate: (index: number) => ({
    y: ["0%", "-115%", "115%", "0%"],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: index * 0.05,
      repeat: Infinity,
      repeatDelay: 4.5,
    },
  }),
};

const roleVariants = {
  initial: { y: "115%", opacity: 0 },
  enter: (index: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: index * 0.04 },
  }),
  exit: (index: number) => ({
    y: "-115%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: index * 0.03 },
  }),
};

type Props = {
  onExplore: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroSection({ onExplore }: Props) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.rotatingRoles.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  const currentRole = siteConfig.rotatingRoles[roleIndex];

  return (
    <section className="relative flex h-auto select-none flex-col items-center justify-center overflow-hidden bg-zinc-950 pb-10 pt-20 sm:pb-12 sm:pt-24 md:h-svh md:flex-row md:items-center md:justify-between">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay" />

      {/* CREATIVE text — large desktop only, positioned absolutely to the section */}
      <h2
        style={{ WebkitTextStroke: "1.5px rgba(34,211,238,0.22)", fontSize: "min(9vw, 120px)" }}
        className="pointer-events-none absolute right-[8%] top-[10%] z-[5] hidden select-none font-black uppercase leading-none tracking-widest text-transparent xl:block"
      >
        CREATIVE
      </h2>

      {/* Role ticker — positioned absolutely to the section, tablet+ */}
      <div
        style={{ height: "min(8vw, 64px)" }}
        className="pointer-events-none absolute bottom-[6rem] right-[5%] z-[25] hidden overflow-hidden sm:flex md:bottom-[5rem] lg:bottom-[6rem]"
      >
        <AnimatePresence mode="wait">
          <motion.h3
            key={roleIndex}
            className="flex whitespace-nowrap font-sans font-black uppercase leading-none tracking-tight text-zinc-100"
            style={{ fontSize: "min(8vw, 64px)" }}
          >
            {Array.from(currentRole).map((char, index) => (
              <motion.span
                key={`${currentRole}-${index}`}
                custom={index}
                variants={roleVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="inline-block"
                style={{
                  textShadow:
                    "1px 1px 0px rgba(34,211,238,0.18), 3px 3px 0px rgba(0,0,0,0.85), 6px 6px 20px rgba(0,0,0,0.95)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Social links sidebar — desktop only */}
      <div className="fixed bottom-12 left-6 z-40 hidden flex-col gap-6 lg:flex xl:left-10">
        <Magnetic>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="block text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
          >
            <Image src="/svgs/github.svg" alt="GitHub" width={24} height={24} className="opacity-50 invert transition-all duration-300 hover:opacity-100" />
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="block text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
          >
            <Image src="/svgs/linkedin.svg" alt="LinkedIn" width={24} height={24} className="opacity-50 invert transition-all duration-300 hover:opacity-100" />
          </a>
        </Magnetic>
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[86.25rem] flex-col items-center gap-6 px-4 sm:gap-8 sm:px-6 md:flex-row md:pl-20 md:pr-10 lg:pl-28 lg:pr-16 xl:pl-32 xl:pr-20">
        {/* Text Content */}
        <div className="relative z-[35] flex w-full flex-col justify-center text-center md:w-[48%] md:text-left lg:w-[45%]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <span className="mb-3 inline-block pl-1 font-mono text-sm font-bold uppercase tracking-wide text-cyan-400 sm:mb-4 sm:text-base">
              Hello! I&apos;m
            </span>
          </motion.div>

          <h1 className="flex flex-col font-sans text-[18vw] font-black uppercase leading-[0.9] tracking-tighter text-zinc-100 sm:text-[13vw] md:text-[clamp(60px,8vw,96px)] md:leading-none">
            <span className="flex justify-center overflow-hidden py-0 md:justify-start md:py-1">
              {Array.from(siteConfig.firstName).map((char, index) => (
                <motion.span
                  key={`first-${char}-${index}`}
                  custom={index}
                  variants={nameLetterVariants}
                  initial="initial"
                  animate="animate"
                  className="inline-block"
                  style={{
                    textShadow:
                      "2px 2px 0px rgba(34,211,238,0.15), 4px 4px 0px rgba(0,0,0,0.85), 8px 8px 24px rgba(0,0,0,0.9)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="flex justify-center overflow-hidden py-0 text-zinc-500 md:justify-start md:py-1">
              {Array.from(siteConfig.lastName).map((char, index) => (
                <motion.span
                  key={`last-${char}-${index}`}
                  custom={index + siteConfig.firstName.length}
                  variants={nameLetterVariants}
                  initial="initial"
                  animate="animate"
                  className="inline-block"
                  style={{
                    textShadow:
                      "2px 2px 0px rgba(255,255,255,0.04), 4px 4px 0px rgba(0,0,0,0.85), 8px 8px 24px rgba(0,0,0,0.9)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto mt-6 max-w-sm border-l-2 border-zinc-800 pl-4 text-base font-medium leading-relaxed text-zinc-400 sm:mt-8 sm:max-w-md sm:text-lg md:mx-0 md:mt-10 md:text-lg lg:text-xl"
          >
            I build <strong className="text-zinc-100">intelligent</strong> digital experiences combining
            high-performance code with striking visual design.
          </motion.p>

          {/* Mobile social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-4 lg:hidden"
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:border-zinc-600"
            >
              <Image src="/svgs/github.svg" alt="GitHub" width={18} height={18} className="opacity-60 invert" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:border-zinc-600"
            >
              <Image src="/svgs/linkedin.svg" alt="LinkedIn" width={18} height={18} className="opacity-60 invert" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6 md:justify-start"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={onExplore}
                className="group relative block overflow-hidden rounded-sm bg-white px-6 py-3 font-black uppercase tracking-wider text-black transition-all duration-300 active:scale-95 sm:px-8 sm:py-4"
              >
                <span className="relative z-10">Explore Work</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Portrait — contained, overflow clipped */}
        <div className="relative flex w-full items-end justify-center overflow-hidden sm:h-auto md:w-[48%] md:items-center md:justify-end lg:w-[50%]">
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              scale: { type: "spring", stiffness: 150, damping: 15 },
              opacity: { duration: 1, delay: 0.2 },
              default: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
            }}
            className="pointer-events-auto relative z-20 w-full overflow-hidden"
            style={{
              maxWidth: "clamp(14rem, 55vw, 30rem)",
              aspectRatio: "3 / 4",
            }}
          >
            <ThreePortrait image={siteConfig.image} alt={siteConfig.name} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
