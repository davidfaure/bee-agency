import { ReactNode } from "react";
import styles from "./BentoGrid.module.scss";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={`${styles.grid} ${className || ""}`}>{children}</div>;
}
