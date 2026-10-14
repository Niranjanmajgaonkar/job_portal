import type { CSSProperties } from "react";

export type IconName = "search" | "pin" | "arrow" | "chevron" | "bookmark" | "bell" | "check" | "shield" | "landmark" | "train" | "zap" | "building" | "heart" | "mail" | "trees" | "graduate" | "clock" | "calendar" | "users" | "file" | "ticket" | "book" | "close" | "menu" | "sliders" | "home" | "external" | "spark" | "briefcase" | "megaphone" | "library" | "chart";
const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
  chevron: <path d="m8 5 7 7-7 7"/>,
  bookmark: <path d="M6 4h12v17l-6-4-6 4V4Z"/>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-9 12a3 3 0 0 0 6 0"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 11 3 3 5-5"/></>,
  landmark: <><path d="m3 8 9-5 9 5H3Zm1 13h16M6 11v7m6-7v7m6-7v7M3 21h18"/></>,
  train: <><rect x="5" y="3" width="14" height="15" rx="4"/><path d="M5 10h14m-7-7v7M8 21l2-3m6 3-2-3"/><circle cx="9" cy="14" r=".8"/><circle cx="15" cy="14" r=".8"/></>,
  zap: <path d="m13 2-9 12h7l-1 8 10-12h-8l1-8Z"/>,
  building: <><path d="M4 21V7h10v14m0-10h6v10M2 21h20M7 10h4m-4 4h4m-4 4h4m6-4h1m-1 4h1M7 7V3h4v4"/></>,
  heart: <><path d="M20 5c-4-4-8 1-8 1S8 1 4 5c-5 5 8 15 8 15S25 10 20 5Z"/><path d="M8 11h8m-4-4v8"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  trees: <><path d="m9 3-6 9h4l-5 6h14l-5-6h4L9 3Zm0 15v4m8-18 5 8h-3l4 5h-5m0 0v5"/></>,
  graduate: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v6c4 3 8 3 12 0v-6m4-3v9"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-14 4h2m3 0h2m3 0h1m-11 3h2m3 0h2"/></>,
  users: <><circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v1"/></>,
  file: <><path d="M14 3H5v18h14V8l-5-5Zm0 0v6h5M8 13h8m-8 4h6"/></>,
  ticket: <><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Zm13 0v3m0 2v2m0 2v3"/></>,
  book: <><path d="M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2v16ZM6 7h3m-3 4h3m6-4h3m-3 4h3"/></>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  sliders: <><path d="M3 6h6m4 0h8M3 12h12m4 0h2M3 18h2m4 0h12"/><circle cx="11" cy="6" r="2"/><circle cx="17" cy="12" r="2"/><circle cx="7" cy="18" r="2"/></>,
  home: <><path d="m3 10 9-7 9 7v11H3V10Zm6 11v-8h6v8"/></>,
  external: <><path d="M14 3h7v7m0-7L11 13M10 3H3v18h18v-7"/></>,
  spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></>,
  megaphone: <><path d="m4 10 12-6v16L4 14v-4Zm12 2h4M8 15v4a1.5 1.5 0 0 0 3 0v-2.5"/></>,
  library: <><path d="M4 21V4h4v17M10 21V4h4v17m2 0 4-14 3 .8-4 13.2-3 0ZM2 21h20"/></>,
  chart: <><path d="M4 20V10m5 10V4m5 16v-7m5 7V7M2 21h20"/></>,
};

export default function Icon({ name, size = 20, className = "", style }: { name: IconName; size?: number; className?: string; style?: CSSProperties }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>{paths[name]}</svg>;
}
