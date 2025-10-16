import { FC } from "react";
import { IconName } from "@/components/ui/icons/Icons/Icons";

export interface BentoItem {
  id: number;
  title: string;
  description: string | string[];
  gridColumn: {
    mobile?: string;
    tablet?: string;
    desktop: string;
  };
  gridRow?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  content?: React.ReactNode;
  ContentComponent?: FC<{ className?: string }>;
  icon?: string;
  image?: string;
  bgColor?: string;
}

export type TilePosition = {
  mobile?: number;
  tablet?: number;
  desktop: number;
};

export type Tile = {
  id: number;
  name: IconName;
  x: number | TilePosition;
  y: number;
  size?: number | TilePosition;
};
