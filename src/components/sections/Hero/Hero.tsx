"use client";

import { Container } from "@/components/ui/Container";
import styles from "./Hero.module.scss";
import { AnimationParagraph } from "@/components/animation/Paragraph";

export function Hero() {
  return (
    <Container>
      <section className={styles.hero}>
        <div className={styles.content}>
          <AnimationParagraph replay>
            <h1 className={styles.title}>Bee Agency</h1>
          </AnimationParagraph>
          <AnimationParagraph replay>
            <h1 className={styles.title}>Test Technique</h1>
          </AnimationParagraph>

          <div className={styles.scroll}>
            <span>Scroll</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
