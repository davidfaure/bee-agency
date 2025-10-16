"use client";

import { FC, SVGProps } from "react";

export const CursorBlack: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="17"
      height="23"
      viewBox="0 0 17 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.599609 1.8457C0.599609 0.776635 1.89247 0.241169 2.64844 0.99707L15.7031 14.0518C16.4587 14.8077 15.9234 16.0995 14.8545 16.0996H8.69824C8.06181 16.0997 7.45101 16.3527 7.00098 16.8027L2.64844 21.1562C1.89252 21.9118 0.599854 21.3764 0.599609 20.3076V1.8457Z"
        fill="#18181B"
        stroke="#09090B"
        strokeWidth="1.2"
      />
    </svg>
  );
};
