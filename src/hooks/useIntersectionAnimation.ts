"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseIntersectionAnimationOptions extends IntersectionObserverInit {
  onEnter: () => void;
  onExit: () => void;
}

export const useIntersectionAnimation = <T extends HTMLElement>(
  target: RefObject<T | null>,
  {
    onEnter,
    onExit,
    threshold = 0.7,
    ...options
  }: UseIntersectionAnimationOptions
): void => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!target.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter();
          } else {
            onExit();
          }
        });
      },
      { threshold, ...options }
    );

    observerRef.current.observe(target.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [target, onEnter, onExit, threshold, options]);
};
