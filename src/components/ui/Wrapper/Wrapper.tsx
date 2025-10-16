import { ReactNode } from "react";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Wrapper({ children, className, id }: WrapperProps) {
  return (
    <section id={id} className={`${styles.section} ${className || ""}`}>
      {children}
    </section>
  );
}
