"use client";

import { AnimationParagraph } from "@/components/animation/Paragraph";
import { Container } from "@/components/ui/Container";
import { Wrapper } from "@/components/ui/Wrapper";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BentoCard } from "@/components/ui/BentoCard";
import { BentoHeader } from "@/components/ui/BentoHeader";
import { BentoContent } from "@/components/ui/BentoContent";
import { BENTO_ITEMS } from "@/lib/constants/bento";
import styles from "./Features.module.scss";

export function Features() {
  return (
    <Container>
      <Wrapper id="features">
        <div className={styles.header}>
          <AnimationParagraph>
            <h2 className={styles.title}>Build a better website, faster.</h2>
          </AnimationParagraph>
        </div>

        <BentoGrid>
          {BENTO_ITEMS.map((item) => {
            const { ContentComponent } = item;
            return (
              <BentoCard
                key={item.id}
                gridColumn={item.gridColumn}
                gridRow={item.gridRow}
              >
                <BentoHeader
                  title={item.title}
                  description={item.description}
                />
                <BentoContent centered>
                  {ContentComponent ? (
                    <ContentComponent className={styles.icon} />
                  ) : (
                    <div className={styles.placeholder}>
                      <span>Visual content here</span>
                    </div>
                  )}
                </BentoContent>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </Wrapper>
    </Container>
  );
}
