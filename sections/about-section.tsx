"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ThreePortrait } from "@/components/three-portrait";
import { Section } from "@/components/section";
import { aboutTags, siteConfig } from "@/constants/site";

export function AboutSection() {
  const headline = siteConfig.aboutHeadline;

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know me"
      className="flex flex-col justify-center"
    >
      {/* Two-column layout: sticky avatar LEFT, scrollable text RIGHT */}
      <div className="mt-4 flex w-full flex-col items-start gap-8 md:mt-8 md:flex-row md:gap-10 lg:gap-16 xl:gap-20">

        {/* LEFT: Sticky Avatar */}
        <div className="flex w-full shrink-0 items-center justify-center md:sticky md:top-28 md:w-[34%] md:self-start lg:top-32 lg:w-[36%] xl:w-[34%]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
            style={{ maxWidth: "clamp(14rem, 50vw, 22rem)", aspectRatio: "3 / 4" }}
          >
            {/* Glow behind avatar */}
            <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl bg-cyan-500/5 blur-3xl" />

            {/* Avatar card */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/40 shadow-2xl shadow-black/60">
              <ThreePortrait image={siteConfig.image} alt={siteConfig.name} />
            </div>

            {/* Name badge below avatar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 flex flex-col items-center gap-1 text-center"
            >
              <span className="font-sans text-base font-bold text-zinc-100">
                {siteConfig.name}
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {siteConfig.role}
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-wide text-zinc-500">
                📍 {siteConfig.location}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: Scrollable Text Content */}
        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
          >
            {/* Headline */}
            <motion.h3
              className="mb-5 flex flex-wrap gap-x-2 gap-y-1 text-2xl font-black uppercase leading-none tracking-tighter text-white sm:text-3xl md:mb-6 md:text-3xl lg:text-4xl xl:text-6xl"
            >
              {headline.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} className="inline-flex overflow-hidden pb-1">
                  <motion.span
                    variants={{
                      hidden: { y: "115%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                      },
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="mb-6 max-w-2xl text-sm font-medium leading-relaxed text-zinc-400 sm:text-base md:mb-8 md:text-lg lg:text-xl"
            >
              Based in Noida, India, I am a{" "}
              <strong className="text-zinc-100">{siteConfig.role}</strong> specializing in building
              highly interactive SPA architectures, secure backend APIs, and scalable cloud systems.{" "}
              <strong className="text-zinc-100">{siteConfig.aboutHighlights[0]}</strong>, I am
              actively available for{" "}
              <strong className="text-cyan-400">{siteConfig.aboutHighlights[1]}</strong>.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4"
            >
              {[
                { value: "1+", label: "Year Experience" },
                { value: "10+", label: "Projects Built" },
                { value: "5K+", label: "Users Served" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start rounded-xl border border-white/[0.06] bg-zinc-900/40 p-4"
                >
                  <span className="font-sans text-2xl font-black text-cyan-400 md:text-3xl">{stat.value}</span>
                  <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Tech tags */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="flex flex-wrap gap-2 md:gap-3"
            >
              {aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1.5 font-mono text-xs tracking-wide text-zinc-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-400 sm:px-4 sm:py-2 sm:text-xs md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
