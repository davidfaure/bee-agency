import { ReactNode } from "react";
import styles from "./BentoContent.module.scss";

interface BentoContentProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function BentoContent({
  children,
  className,
  centered = false,
}: BentoContentProps) {
  return (
    <div
      className={`${styles.content} ${centered ? styles.centered : ""} ${className || ""}`}
    >
      {children}
    </div>
  );
}
