"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/section";

const SkillsScene = dynamic(() => import("@/components/skills-scene").then((mod) => mod.SkillsScene), {
  ssr: false,
  loading: () => <div className="h-[56rem] w-full bg-zinc-950 md:h-[50rem]" />,
});

export function SkillsSection() {
  return (
    <Section id="skills" title="Skills" subtitle="Hover to scatter" className="max-w-none! px-0">
      <SkillsScene />
    </Section>
  );
}
