"use client";

import { ReactNode, useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
  };
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    lenisRef.current = new Lenis({
      duration: options?.duration ?? 1.2,
      easing:
        options?.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: options?.smoothWheel ?? true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: isMobile,
      syncTouchLerp: isMobile ? 1 : 0.1,
    });

    (window as Window & { lenis?: Lenis }).lenis = lenisRef.current;

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        (window as Window & { lenis?: Lenis }).lenis = undefined;
      }
    };
  }, [options]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within LenisProvider");
  }
  return context;
};
