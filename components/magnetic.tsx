"use client";

import { motion, useSpring } from "framer-motion";
import { ReactElement, ReactNode, cloneElement, isValidElement, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Magnetic({ children, className = "inline-block" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = event;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ draggable?: boolean; onDragStart?: (e: React.DragEvent) => void }>, {
        draggable: false,
        onDragStart: (e: React.DragEvent) => e.preventDefault(),
      })
    : children;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClickCapture={(event) => {
        if (dragging.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      style={{ x, y }}
    >
      {child}
    </motion.div>
  );
}
