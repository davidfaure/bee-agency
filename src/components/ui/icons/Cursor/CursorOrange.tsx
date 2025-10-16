"use client";

import { FC, SVGProps } from "react";

export const CursorOrange: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.6003 1.8457C16.6003 0.776635 15.3075 0.241169 14.5515 0.99707L1.49683 14.0518C0.74123 14.8077 1.27653 16.0995 2.34546 16.0996H8.50171C9.13814 16.0997 9.74895 16.3527 10.199 16.8027L14.5515 21.1562C15.3074 21.9118 16.6001 21.3764 16.6003 20.3076V1.8457Z"
        stroke="#FB923C"
        strokeWidth="1.2"
      />
    </svg>
  );
};
