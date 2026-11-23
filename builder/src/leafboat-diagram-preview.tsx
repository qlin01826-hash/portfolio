"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fit the existing, complete diagram into its preview without changing its content. */
export function ExistingDiagramPreview({ label, children }: { label: string; children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ scale: number; height: number } | null>(null);

  useEffect(() => {
    const outer = container.current;
    const inner = diagram.current;
    if (!outer || !inner) return;
    const measure = () => {
      const scale = outer.clientWidth / 900;
      const height = Math.ceil(inner.offsetHeight * scale);
      setSize(previous => previous?.scale === scale && previous?.height === height ? previous : { scale, height });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    measure();
    return () => observer.disconnect();
  }, []);

  return <div ref={container} className="lb-existing-preview" role="img" aria-label={label} style={size ? { height: size.height } : { aspectRatio: "900 / 760" }}>
    <div ref={diagram} className="lb-existing-preview-inner" aria-hidden="true" inert style={{ transform: `scale(${size?.scale ?? 0.6})` }}>{children}</div>
  </div>;
}
