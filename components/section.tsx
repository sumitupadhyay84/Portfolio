"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

const letterVariants = {
  initial: { y: "0%", opacity: 1 },
  animate: (index: number) => ({
    y: ["0%", "-115%", "115%", "0%"],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: index * 0.04,
      repeat: Infinity,
      repeatDelay: 5.5,
    },
  }),
};

export function Section({ children, id, className = "", title, subtitle }: Props) {
  const ref = useRef<HTMLElement>(null);
  let letterIndex = 0;

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-[86.25rem] scroll-mt-16 px-4 py-10 sm:px-6 md:scroll-mt-28 md:py-20 md:pl-20 md:pr-10 lg:pl-28 lg:pr-16 xl:pl-32 xl:pr-20",
        className
      )}
    >
      {title && (
        <div className="relative mb-8 w-full text-left md:mb-12">
          <div className="relative z-10 flex flex-col items-start overflow-visible">
            <h2 className="flex flex-wrap items-center overflow-visible font-sans text-4xl font-black uppercase leading-none tracking-tighter text-zinc-100 sm:text-5xl md:text-6xl lg:text-7xl">
              {title.toUpperCase().split(" ").map((word) => (
                <span key={word} className="mr-[0.25em] flex overflow-hidden py-1 pr-2.5">
                  {Array.from(word).map((char) => {
                    const current = letterIndex++;
                    return (
                      <motion.span
                        key={`${word}-${current}`}
                        custom={current}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        className="inline-block"
                        style={{
                          textShadow:
                            "2px 2px 0px rgba(34,211,238,0.08), 4px 4px 0px rgba(0,0,0,0.85), 8px 8px 24px rgba(0,0,0,0.9)",
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
