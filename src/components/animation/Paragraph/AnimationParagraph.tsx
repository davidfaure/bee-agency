"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";
import { animateTextIn, animateTextOut } from "@/lib/utils/text";
import { split } from "@/lib/utils/split";
import { CUSTOMEASE } from "@/lib/utils/easings";
import styles from "./AnimationParagraph.module.scss";

interface AnimationParagraphProps {
  children: ReactNode;
  replay?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
}

export function AnimationParagraph({
  children,
  replay = false,
  delay = 0,
  stagger = 0.01,
  className = "",
}: AnimationParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const paragraphs = containerRef.current.querySelectorAll("h1, h2, h3, p");
    const lines: HTMLElement[] = [];

    paragraphs.forEach((element) => {
      const htmlElement = element as HTMLElement;

      split({ element: htmlElement });
      split({ element: htmlElement });

      const spans = Array.from(
        htmlElement.querySelectorAll("span span")
      ) as HTMLElement[];

      lines.push(...spans);
    });

    linesRef.current = lines;

    animateTextOut(lines);
  }, []);

  useIntersectionAnimation(containerRef, {
    onEnter: () => {
      animateTextIn(linesRef.current, CUSTOMEASE, stagger, 1.5, delay);
    },
    onExit: () => {
      animateTextOut(linesRef.current, replay);
    },
    threshold: 0.7,
  });

  return (
    <div ref={containerRef} className={`${styles.paragraph} ${className}`}>
      {children}
    </div>
  );
}
