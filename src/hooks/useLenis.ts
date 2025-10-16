"use client";
import React from "react";
import { useEffect, useCallback } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const useLenis = () => {
  const getLenis = useCallback(() => {
    return (window as Window & typeof globalThis).lenis as Lenis | undefined;
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
        immediate?: boolean;
      }
    ) => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, options);
      }
    },
    [getLenis]
  );

  const stop = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }
  }, [getLenis]);

  const start = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.start();
    }
  }, [getLenis]);

  return {
    scrollTo,
    stop,
    start,
    lenis: getLenis(),
  };
};

export const useLenisScroll = (callback: (lenis: Lenis) => void) => {
  useEffect(() => {
    const lenis = (window as Window & typeof globalThis).lenis as
      | Lenis
      | undefined;

    if (!lenis) return;

    lenis.on("scroll", callback);

    return () => {
      lenis.off("scroll", callback);
    };
  }, [callback]);
};

export const useScrollPosition = (): number => {
  const [scrollY, setScrollY] = React.useState(0);

  useLenisScroll((lenis) => {
    setScrollY(lenis.scroll);
  });

  return scrollY;
};
