"use client";

import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Chat.module.scss";
import { ChatMessage } from "./ChatMessage";

export const Chat: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const topEls = gsap.utils.toArray<HTMLElement>(`.${styles.chatTopClick}`);
      const bottomEls = gsap.utils.toArray<HTMLElement>(
        `.${styles.chatBottomClick}`
      );

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.3, ease: "power2.out", overwrite: "auto" },
      });

      tl.to(topEls, { x: 18, y: 8 }, 0).to(bottomEls, { x: -12, y: -18 }, 0);

      const card = rootRef.current?.closest(
        "[data-bento-card]"
      ) as HTMLElement | null;
      if (!card) return;

      const onEnter = () => tl.play(0);
      const onLeave = () => tl.reverse();

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        tl.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.chatBackground} aria-hidden />
        <div className={styles.chatTop}>
          <ChatMessage
            text="We need to update this heading before launch"
            variant="primary"
          />
          <div className={styles.chatTopClick}>
            <ChatMessage text="Sofia G." variant="secondary" showCursor />
          </div>
          <div className={styles.chatTopClickHidden}>
            <ChatMessage text="Sofia G." variant="secondary" showCursor />
          </div>
        </div>

        <div className={styles.chatBottom}>
          <ChatMessage
            text="Let me quickly jump into Sanity and fix it"
            variant="primary"
          />
          <ChatMessage text="Done!" variant="primary" />
          <div className={styles.chatBottomClick}>
            <ChatMessage text="Eric D." variant="tertiary" showCursor />
          </div>
          <div className={styles.chatBottomClickHidden}>
            <ChatMessage text="Eric D." variant="tertiary" showCursor />
          </div>
        </div>
      </div>
    </div>
  );
};
