"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { Section } from "@/components/section";
import { TiltCard } from "@/components/tilt-card";
import { projects } from "@/constants/site";

export function ProjectsSection() {
  return (
    <Section id="projects" title="My Work" subtitle="Featured Works">
      <div className="relative mx-auto mt-6 flex w-full flex-col gap-12 sm:mt-8 md:mt-12 md:gap-20 md:px-4 lg:gap-24 lg:px-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex w-full flex-col items-start justify-between gap-8 border-b border-zinc-800/40 pb-12 last:border-0 last:pb-0 sm:gap-8 md:flex-row md:items-center md:gap-10 md:pb-20 lg:gap-14 lg:pb-24"
          >
            {/* Left: Info */}
            <div className="flex w-full flex-row items-start gap-3 md:w-1/2 md:gap-5 lg:gap-6">
              <span className="select-none font-mono text-3xl font-black leading-none text-zinc-800/50 sm:text-4xl md:text-5xl lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col">
                <h3 className="cursor-default text-lg font-extrabold leading-tight text-zinc-100 sm:text-xl md:text-2xl lg:text-3xl">
                  <ScrambleText text={project.title.split(" | ")[0] ?? project.title} />
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-400 sm:text-sm md:mt-2">
                  {project.subtitle}
                </p>
                <span className="mt-4 block text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:text-xs md:mt-6">
                  TOOLS &amp; FEATURES
                </span>
                {Array.isArray(project.description) ? (
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-500 sm:text-sm">
                    {project.description.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 shrink-0 text-[10px] text-cyan-500">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">{project.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-zinc-800/80 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 sm:px-2.5 sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 md:mt-6 lg:mt-8">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Project"
                    className="rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-cyan-950/20 hover:text-cyan-400 sm:p-2"
                  >
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-cyan-950/20 hover:text-cyan-400 sm:p-2"
                  >
                    <Image
                      src="/svgs/github.svg"
                      alt="GitHub"
                      width={22}
                      height={18}
                      className="h-4 w-5 opacity-50 invert transition-all duration-300 hover:opacity-100 sm:h-5 sm:w-6"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Image card */}
            <div className="flex w-full items-center justify-center md:w-1/2">
              <TiltCard className="w-full">
                <div
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-zinc-950/50 shadow-2xl sm:rounded-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 z-10 bg-zinc-950/10 transition-colors duration-500 group-hover:bg-transparent" />
                  <div
                    className="relative h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-3"
                      priority={index === 0}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
