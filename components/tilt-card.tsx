"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { damping: 35, stiffness: 220, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 35, stiffness: 220, mass: 0.5 });

  const tiltX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const { clientX, clientY } = event;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
