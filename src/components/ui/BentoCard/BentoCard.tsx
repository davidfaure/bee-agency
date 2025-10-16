"use client";

import { ReactNode } from "react";
import styles from "./BentoCard.module.scss";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  gridColumn?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  gridRow?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

export function BentoCard({
  children,
  className,
  gridColumn,
  gridRow,
}: BentoCardProps) {
  const styleVars = {
    ["--grid-mobile" as string]: gridColumn?.mobile || "1 / -1",
    ["--grid-tablet" as string]:
      gridColumn?.tablet || gridColumn?.mobile || "1 / -1",
    ["--grid-desktop" as string]:
      gridColumn?.desktop ||
      gridColumn?.tablet ||
      gridColumn?.mobile ||
      "1 / -1",
    ["--row-mobile" as string]: gridRow?.mobile || "auto",
    ["--row-tablet" as string]: gridRow?.tablet || gridRow?.mobile || "auto",
    ["--row-desktop" as string]:
      gridRow?.desktop || gridRow?.tablet || gridRow?.mobile || "auto",
  };

  return (
    <div
      data-bento-card
      style={styleVars}
      className={`${styles.card} ${className || ""}`}
    >
      {children}
    </div>
  );
}
