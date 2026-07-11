"use client";

import { ArrowUpRight, Copyright } from "lucide-react";
import { Section } from "@/components/section";
import { siteConfig } from "@/constants/site";

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex w-full flex-col gap-8 border-t border-zinc-800/80 pt-8 sm:pt-10 md:flex-row md:gap-6 md:pt-12 lg:gap-8">
        {/* Contact details */}
        <div className="flex w-full flex-col md:w-1/2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">Email</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-sm font-semibold text-zinc-200 transition-colors hover:text-cyan-400 md:text-base"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">Phone</span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="text-sm font-semibold text-zinc-200 transition-colors hover:text-cyan-400 md:text-base"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex flex-col sm:col-span-2 md:col-span-1">
              <span className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">Location</span>
              <span className="text-sm font-semibold text-zinc-200 md:text-base">{siteConfig.location}</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="flex w-full flex-col md:w-1/4 md:pl-6 lg:pl-10">
          <span className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:mb-4 sm:text-xs">Social</span>
          <div className="flex flex-row flex-wrap gap-4 md:flex-col md:gap-3">
            {[
              { label: "Website", href: "#top" },
              { label: "Linkedin", href: siteConfig.linkedin },
              { label: "Github", href: siteConfig.github },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Website" ? undefined : "_blank"}
                rel={item.label === "Website" ? undefined : "noopener noreferrer"}
                className="group w-fit border-b border-zinc-800 pb-0.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-400 sm:text-base md:text-base lg:text-lg"
              >
                {item.label}
                <ArrowUpRight className="ml-1 inline-block transition-all duration-300 group-hover:translate-x-1" size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Credit + Copyright */}
        <div className="flex w-full flex-row items-end justify-between gap-4 md:w-1/4 md:flex-col md:items-end md:justify-between md:gap-0 md:text-right">
          <div>
            <p className="text-sm font-semibold leading-relaxed text-zinc-300 md:text-base">Designed and Developed</p>
            <p className="text-sm font-bold leading-relaxed text-zinc-200 md:text-base">
              by <span className="text-cyan-400 transition-colors hover:text-cyan-300">{siteConfig.name}</span>
            </p>
          </div>
          <p className="flex flex-row items-center gap-1 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 sm:text-xs md:mt-20 lg:mt-24">
            <Copyright size={13} /> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </Section>
  );
}
