"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  id: string;
  className?: string;
  minHeightClass?: string;
};

const loadedSections = new Set<string>();

export function LazySection({ children, id, className = "", minHeightClass = "" }: Props) {
  const [visible, setVisible] = useState(() => loadedSections.has(id));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadedSections.has(id)) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          loadedSections.add(id);
          observer.unobserve(node);
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div ref={ref} id={id} className={`${minHeightClass} ${className}`}>
      {visible ? children : <div className={minHeightClass} />}
    </div>
  );
}
