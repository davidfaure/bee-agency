import { BentoItem, Tile } from "@/types";

export const BENTO_ITEMS: BentoItem[] = [
  {
    id: 1,
    title: "100+ sections and components",
    description:
      "All the elements you need to build a modern, responsive, and accessible landing page.",
    gridColumn: {
      mobile: "1 / -1",
      tablet: "1 / 11",
      desktop: "1 / 11",
    },
  },
  {
    id: 2,
    title: "You're in control",
    description:
      "This is not a component library. It's a collection of re-usable components that you can copy and paste into your apps.",
    gridColumn: {
      mobile: "1 / -1",
      tablet: "11 / 23",
      desktop: "11 / 23",
    },
  },
  {
    id: 3,
    title: "Fits right into your stack",
    description: [
      "Built with modern web technologies and tools that fit right into any React project.",
      "No bloat, no extra dependencies, no risk of conflicts.",
    ],
    gridColumn: {
      mobile: "1 / -1",
      tablet: "1 / 11",
      desktop: "1 / 13",
    },
  },
  {
    id: 4,
    title: "Data-agnostic",
    description: [
      "All the data is separate from components so you can edit it in seconds or make it dynamic.",
      "Easily connect to a CMS of your choice.",
    ],
    gridColumn: {
      mobile: "1 / -1",
      tablet: "11 / 23",
      desktop: "13 / 23",
    },
  },
];

export const TILES: Tile[] = [
  {
    id: 1,
    name: "tailwindcss",
    x: { mobile: 1, tablet: 10, desktop: 15 },
    y: 13,
    size: 8.4,
  },
  {
    id: 2,
    name: "figma",
    x: { mobile: 11, tablet: 20, desktop: 26 },
    y: 8,
    size: 8.4,
  },
  {
    id: 3,
    name: "shadcn",
    x: { mobile: 11, tablet: 20, desktop: 26 },
    y: 18,
    size: 8.4,
  },
  {
    id: 4,
    name: "react",
    x: { mobile: 21, tablet: 30, desktop: 37 },
    y: 13,
    size: 8.4,
  },
  {
    id: 5,
    name: "typescript",
    x: { mobile: 31, tablet: 40, desktop: 48 },
    y: 8,
    size: 8.4,
  },
];
