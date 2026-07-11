"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const position = useRef({ x: -100, y: -100 });
  const [hoverText, setHoverText] = useState(false);
  const [hoverMedia, setHoverMedia] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const scale = useSpring(1, { stiffness: 500, damping: 28 });
  const x = useSpring(-100, { stiffness: 500, damping: 28 });
  const y = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const check = () => {
      const isTouch =
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setDisabled(isTouch);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (disabled) return;

    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
      setHidden(false);

      const target = event.target as HTMLElement;
      setHoverMedia(!!target.closest("canvas, img, .no-custom-cursor"));
      setHoverText(
        !!target.closest(
          "p, h1, h2, h3, h4, h5, h6, span, a, li, strong, em, label, button, input, textarea"
        )
      );
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    let frame = 0;
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.18;
      position.current.y += (mouse.current.y - position.current.y) * 0.18;
      x.set(position.current.x - 20);
      y.set(position.current.y - 20);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(frame);
    };
  }, [disabled, x, y]);

  useEffect(() => {
    if (disabled) return;
    if (hoverText) scale.set(2.5);
    else if (hoverMedia) scale.set(0.5);
    else scale.set(1);
  }, [hoverText, hoverMedia, scale, disabled]);

  if (disabled) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ x, y, willChange: "transform" }}
    >
      <motion.div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-300"
        style={{ scale }}
      />
    </motion.div>
  );
}
