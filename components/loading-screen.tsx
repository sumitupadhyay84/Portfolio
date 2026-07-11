"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/constants/site";

type Props = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = (100 - current) / (4000 / 20);
    const interval = window.setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        window.clearInterval(interval);
        window.setTimeout(() => onComplete(), 300);
      }
      setProgress(Math.floor(current));
    }, 20);
    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-[9999] flex select-none flex-col justify-between overflow-hidden bg-zinc-950 p-8 text-zinc-100 md:p-16"
      >
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 16, repeat: Infinity }}
            className="flex whitespace-nowrap text-[10vw] font-black uppercase leading-none tracking-tighter text-zinc-800"
          >
            <span className="pr-12">
              {siteConfig.role.toUpperCase()} • {siteConfig.rotatingRoles.join(" • ")} •&nbsp;
            </span>
            <span className="pr-12">
              {siteConfig.role.toUpperCase()} • {siteConfig.rotatingRoles.join(" • ")} •&nbsp;
            </span>
          </motion.div>
        </div>

        <div className="z-10 flex w-full items-center justify-between">
          <span className="font-sans text-base font-bold tracking-widest">{siteConfig.initials}</span>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
            PORTFOLIO EDITION ©{new Date().getFullYear()}
          </span>
        </div>

        <div className="z-10 flex w-full flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-32.5 items-center justify-center overflow-visible md:h-55">
            <motion.h1
              className="flex items-center justify-center py-2 font-mono text-8xl font-black leading-none tracking-tighter md:text-[180px]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {String(progress).padStart(3, "0")}
              <span className="ml-3 flex items-center text-3xl leading-none text-cyan-400 md:text-6xl">%</span>
            </motion.h1>
          </div>
          <p className="mt-6 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Initializing interactive experiences...
          </p>
        </div>

        <div className="z-10 flex w-full flex-col gap-4">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-900">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span>Loading assets</span>
            <span>Please wait</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
