"use client";

import { useCallback, useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

type Props = {
  text: string;
  className?: string;
};

export function ScrambleText({ text, className = "" }: Props) {
  const [display, setDisplay] = useState(text);
  const [active, setActive] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) window.clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => window.clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    return scramble();
  }, [active, text, scramble]);

  return (
    <span className={className} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      {display}
    </span>
  );
}
