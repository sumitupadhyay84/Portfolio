"use client";

import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import { Section } from "@/components/section";
import { TiltCard } from "@/components/tilt-card";
import { education } from "@/constants/site";

function EducationIcon({ type }: { type: string }) {
  if (type === "College") return <GraduationCap className="h-14 w-14 text-zinc-800 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />;
  return <School className="h-14 w-14 text-zinc-800 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />;
}

export function EducationSection() {
  return (
    <Section id="education" title="Education" subtitle="My Academic Journey">
      <div className="relative mx-auto mt-6 flex w-full flex-col gap-10 sm:mt-8 md:mt-10 md:gap-14 md:px-4 lg:gap-20 lg:px-8">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex w-full flex-col items-start justify-between gap-6 border-b border-zinc-800/40 pb-10 last:border-0 last:pb-0 sm:gap-8 md:gap-10 md:pb-14 lg:flex-row lg:items-center lg:gap-14 lg:pb-20 xl:pb-24"
          >
            {/* Left: Info */}
            <div className="relative flex w-full flex-row items-start gap-3 lg:w-1/2 lg:gap-5 xl:gap-6">
              <div className="pointer-events-none absolute -left-3 -top-6 z-0 select-none opacity-20 sm:-left-4 sm:-top-8">
                <EducationIcon type={item.type} />
              </div>
              <span className="z-10 select-none font-mono text-3xl font-black leading-none text-zinc-800/70 sm:text-4xl md:text-5xl lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="z-10 flex flex-1 flex-col">
                <h3 className="text-lg font-extrabold leading-tight text-zinc-100 sm:text-xl md:text-2xl lg:text-3xl">
                  {item.degree.split(" | ")[0]}
                </h3>
                {item.degree.includes("|") && (
                  <span className="mt-1 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-base font-bold text-transparent sm:text-lg">
                    {item.degree.split(" | ")[1]?.trim()}
                  </span>
                )}
                <h4 className="mt-2 text-base font-medium text-zinc-400 sm:text-lg md:mt-3 md:text-xl">{item.institution}</h4>
                <span className="mt-4 block text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:text-xs md:mt-6">
                  ACADEMIC DETAILS
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <span className="flex items-center rounded-full border border-cyan-500/30 bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)] sm:px-4 sm:py-1.5 sm:text-sm">
                    {item.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Card */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
              <TiltCard className="w-full">
                <div
                  className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-5 shadow-2xl sm:rounded-2xl sm:p-6 md:p-8"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-cyan-500/10 blur-[70px] sm:-right-32 sm:-top-32 sm:h-72 sm:w-72 sm:blur-[80px]" />
                  <ul className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5" style={{ transform: "translateZ(20px)" }}>
                    {item.description.map((line) => (
                      <li
                        key={line}
                        className="flex items-start text-xs text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 sm:text-sm md:text-base"
                      >
                        <span className="mr-2.5 mt-0.5 shrink-0 text-cyan-500/70 group-hover:text-cyan-400 sm:mr-3">•</span>
                        <span className="leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
