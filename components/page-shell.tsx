"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingActions, ScrollToTop } from "@/components/floating-actions";
import { LoadingScreen } from "@/components/loading-screen";
import { LazySection } from "@/components/lazy-section";
import { Navbar } from "@/components/navbar";
import { useLenis } from "@/hooks/use-lenis";
import { AboutSection } from "@/sections/about-section";
import { ContactSection } from "@/sections/contact-section";
import { EducationSection } from "@/sections/education-section";
import { HeroSection } from "@/sections/hero-section";
import { ProjectsSection } from "@/sections/projects-section";
import { SkillsSection } from "@/sections/skills-section";

export function PageShell() {
  const [loading, setLoading] = useState(true);
  useLenis();

  const navigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        id="top"
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <CustomCursor />
        <Navbar onNavigate={navigate} />
        <FloatingActions />
        <ScrollToTop />

        <main>
          <HeroSection onExplore={(event) => navigate(event, "#projects")} />

          <LazySection id="about" minHeightClass="min-h-[36rem] sm:min-h-[44rem] md:min-h-[56rem]">
            <AboutSection />
          </LazySection>

          <LazySection id="skills" minHeightClass="min-h-fit">
            <SkillsSection />
          </LazySection>

          <LazySection id="education" minHeightClass="min-h-[28rem] sm:min-h-[34rem] md:min-h-[37.5rem]">
            <EducationSection />
          </LazySection>

          <LazySection id="projects" minHeightClass="min-h-[34rem] sm:min-h-[40rem] md:min-h-[50rem]">
            <ProjectsSection />
          </LazySection>

          <LazySection id="contact" minHeightClass="min-h-[24rem] sm:min-h-[28rem] md:min-h-[27.5rem]">
            <ContactSection />
          </LazySection>
        </main>
      </motion.div>
    </div>
  );
}
