"use client";

import dynamic from "next/dynamic";

export const ThreePortrait = dynamic(
  () => import("@/components/three-portrait-canvas").then((mod) => mod.ThreePortrait),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-zinc-900/40" />,
  }
);
