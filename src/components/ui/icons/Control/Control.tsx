"use client";

import { FC, SVGProps } from "react";
import styles from "./Control.module.scss";

interface ControlProps {
  className?: string;
}

export const Control: FC<ControlProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background} aria-hidden />
      <div className={styles.wrapper}>
        <div className={styles.rings} aria-hidden>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{ ["--i" as string]: i }} />
          ))}
        </div>
        <div className={styles.gradient}>
          <div className={styles.shadow}>
            <ControlLogo className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ControlLogo: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="164"
      height="164"
      viewBox="0 0 164 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2177_6244)">
        <path
          d="M8 82C8 41.1309 41.1309 8 82 8C122.869 8 156 41.1309 156 82C156 122.869 122.869 156 82 156C41.1309 156 8 122.869 8 82Z"
          fill="url(#paint0_linear_2177_6244)"
        />
        <path
          d="M82 7.5C123.145 7.5 156.5 40.8548 156.5 82C156.5 123.145 123.145 156.5 82 156.5C40.8548 156.5 7.5 123.145 7.5 82C7.5 40.8548 40.8548 7.5 82 7.5Z"
          stroke="#09090B"
          strokeOpacity="0.1"
        />
        <g filter="url(#filter0_dd_2177_6244)">
          <path
            d="M76.6667 84.6667H50L60.6667 74H71.3333L95.3333 50H111.333L76.6667 84.6667Z"
            fill="#09090B"
          />
          <path
            d="M79.3333 92.6667V87.3333L114 52.6667V58L79.3333 92.6667Z"
            fill="#09090B"
          />
          <path
            d="M79.3333 103.333V98L114 63.3333V68.6667L79.3333 103.333Z"
            fill="#09090B"
          />
          <path
            d="M79.3333 114V108.667L92.6667 95.3333V100.667L79.3333 114Z"
            fill="#09090B"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dd_2177_6244"
          x="-24.6667"
          y="-24.6666"
          width="213.333"
          height="213.333"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="32" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.992157 0 0 0 0 0.729412 0 0 0 0 0.454902 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2177_6244"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.992157 0 0 0 0 0.729412 0 0 0 0 0.454902 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2177_6244"
            result="effect2_dropShadow_2177_6244"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2177_6244"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2177_6244"
          x1="82"
          y1="156"
          x2="82"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#09090B" stopOpacity="0.05" />
          <stop offset="1" stopColor="#09090B" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id="clip0_2177_6244">
          <path
            d="M0 82C0 36.7126 36.7126 0 82 0C127.287 0 164 36.7126 164 82C164 127.287 127.287 164 82 164C36.7126 164 0 127.287 0 82Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
