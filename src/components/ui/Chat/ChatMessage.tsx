"use client";

import { FC } from "react";
import clsx from "clsx";
import styles from "./Chat.module.scss";
import { CursorBlack } from "../icons/Cursor/CursorBlack";
import { CursorOrange } from "../icons/Cursor/CursorOrange";

type Variant = "primary" | "secondary" | "tertiary";

interface ChatMessageProps {
  text: string;
  variant?: Variant;
  className?: string;
  showCursor?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({
  text,
  variant = "primary",
  className,
  showCursor = false,
}) => {
  const Cursor =
    variant === "secondary"
      ? CursorOrange
      : variant === "tertiary"
      ? CursorBlack
      : null;

  return (
    <div
      className={clsx(styles.chatMessage, className)}
      data-variant={variant}
      role="status"
      aria-live="polite"
    >
      {text}
      {showCursor && Cursor ? (
        <span className={styles.cursor} aria-hidden>
          <Cursor />
        </span>
      ) : null}
    </div>
  );
};
