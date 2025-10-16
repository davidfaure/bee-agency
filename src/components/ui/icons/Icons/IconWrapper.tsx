"use client";

import { CSSProperties, FC } from "react";
import styles from "./Icons.module.scss";
import { Icon } from "./Icons";
import { TILES } from "@/lib/constants/bento";

interface IconWrapperProps {
  className?: string;
}

export const IconWrapper: FC<IconWrapperProps> = () => {
  return (
    <div className={styles.wrapper}>
      {TILES.map(({ id, name, x, y, size = 44 }) => {
        const xMobile = typeof x === "object" ? x.mobile || x.desktop : x;
        const xTablet = typeof x === "object" ? x.tablet || x.desktop : x;
        const xDesktop = typeof x === "object" ? x.desktop : x;

        const sizeMobile = typeof size === "object" ? size.mobile || size.desktop : size;
        const sizeTablet = typeof size === "object" ? size.tablet || size.desktop : size;
        const sizeDesktop = typeof size === "object" ? size.desktop : size;

        return (
          <div
            key={id}
            className={styles.tile}
            style={
              {
                "--x-mobile": `${xMobile}rem`,
                "--x-tablet": `${xTablet}rem`,
                "--x-desktop": `${xDesktop}rem`,
                "--y": `${y}rem`,
                "--size-mobile": `${sizeMobile}rem`,
                "--size-tablet": `${sizeTablet}rem`,
                "--size-desktop": `${sizeDesktop}rem`,
              } as CSSProperties
            }
          >
            <Icon name={name} className={styles.icon} />
          </div>
        );
      })}
    </div>
  );
};
