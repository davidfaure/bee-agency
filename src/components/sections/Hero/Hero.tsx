"use client";

import { Container } from "@/components/ui/Container";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <Container>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Bee Agency
            <br />
            Test Technique
          </h1>

          <div className={styles.scroll}>
            <span>Scroll</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
