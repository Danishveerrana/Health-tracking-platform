import React from "react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useHealthNotifications, requestNotificationPermission } from './useHealthNotifications';
import React from "react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════════════════════════
const THEMES = {
  dark: {
    bg: "#0A0C12",
    card: "#10131E",
    cardAlt: "#13172A",
    border: "#1E2340",
    borderStrong: "#2A3060",
    muted: "#38446A",
    dim: "#5A6A9A",
    text: "#E8EDF8",
    textSub: "#8A9AC8",
    accent: "#7C6FFF",
    green: "#1DFFA8",
    red: "#FF4D6A",
    amber: "#FFB347",
    pink: "#FF6EE8",
    cyan: "#38E8FF",
    accentBg: "#7C6FFF18",
    greenBg: "#1DFFA808",
    redBg: "#FF4D6A08",
    toggleBg: "#1E2340",
    shadow: "0 0 0 1px #1E2340",
    gradTop: "linear-gradient(180deg,#13172A 0%,#0A0C12 100%)",
  },
  light: {
    bg: "#F0EEF8",
    card: "#FAFAF8",
    cardAlt: "#F5F3FF",
    border: "#DDD9F0",
    borderStrong: "#C4BEE8",
    muted: "#A09CC8",
    dim: "#7870A8",
    text: "#1A1730",
    textSub: "#504888",
    accent: "#6C5CE7",
// ═══════════════════════════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════════════════════════
const THEMES = {
  dark: {
    bg: "#0A0C12",
    card: "#10131E",
    cardAlt: "#13172A",
    border: "#1E2340",
    borderStrong: "#2A3060",
    muted: "#38446A",
    dim: "#5A6A9A",
    text: "#E8EDF8",
    textSub: "#8A9AC8",
    accent: "#7C6FFF",
    green: "#1DFFA8",
    red: "#FF4D6A",
    amber: "#FFB347",
    pink: "#FF6EE8",
    cyan: "#38E8FF",
    accentBg: "#7C6FFF18",
    greenBg: "#1DFFA808",
    redBg: "#FF4D6A08",
    toggleBg: "#1E2340",
    shadow: "0 0 0 1px #1E2340",
    gradTop: "linear-gradient(180deg,#13172A 0%,#0A0C12 100%)",
  },
  light: {
    bg: "#F0EEF8",
    card: "#FAFAF8",
    cardAlt: "#F5F3FF",
    border: "#DDD9F0",
    borderStrong: "#C4BEE8",
    muted: "#A09CC8",
    dim: "#7870A8",
    text: "#1A1730",
    textSub: "#504888",
    accent: "#6C5CE7",
    green: "#00C896",
    red: "#FF4060",
    amber: "#FF9500",
    pink: "#E040CB",
    cyan: "#00B8D4",
    accentBg: "#6C5CE722",
    greenBg: "#00C89618",
    redBg: "#FF406018",
    toggleBg: "#DDD9F0",
    shadow: "0 2px 12px #6C5CE715",
    gradTop: "linear-gradient(180deg,#EEEBFF 0%,#F0EEF8 100%)",
  },
};

// ═══════════════════════════════════════════════════════════════════
// DARK MODE ICONS — crisp, geometric, enhanced strokes
// ═══════════════════════════════════════════════════════════════════
const DarkIcons = {
  Water: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C12 3 5 10.5 5 15.5a7 7 0 0 0 14 0C19 10.5 12 3 12 3Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round"/>
      <path d="M8.5 16.5c.5-2 2.5-3 3.5-3" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" opacity={0.5}/>
    </svg>
  ),
  Run: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="14" cy="4.5" r="1.8" stroke="currentColor" strokeWidth={1.5}/>
      <path d="M10 8.5l2 3.5 3.5-2.5 2 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14l3.5 0.5-1.5 4M14 12l1.5 5-3 1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  Sleep: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 12.5A9 9 0 1 1 11.5 4 6.5 6.5 0 0 0 20 12.5Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round"/>
      <path d="M15 9h3l-3 3h3" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" opacity={0.6}/>
    </svg>
  ),
  Meditate: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="4.5" r="2" stroke="currentColor" strokeWidth={1.5}/>
      <path d="M8 21c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
      <path d="M5 14l3-2.5m8 0 3 2.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
      <path d="M9 11.5c0 0 1.5 2 3 2s3-2 3-2" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round"/>
    </svg>
  ),
  Leaf: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21V9M12 9C12 9 4.5 5.5 4 2c5.5.5 8 4 8 7zM12 9c0 0 7.5-3.5 8-7-5.5.5-8 4-8 7z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  NoSugar: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={1.6}/>
      <path d="M5.5 5.5l13 13" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/>
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" opacity={0.4}/>
    </svg>
  ),
  Book: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4.5C4 3.4 4.9 2.5 6 2.5h14v17H6a2 2 0 0 1-2-2V4.5Z" stroke="currentColor" strokeWidth={1.5}/>
      <path d="M4 17.5h14M8 6.5h8M8 9.5h6" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" opacity={0.6}/>
    </svg>
  ),
  Steps: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 17l4.5-4.5 4 4 4.5-8.5 4.5 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20.5h18" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" opacity={0.5}/>
    </svg>
  ),
  Target: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5}/>
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth={1.3}/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  Flame: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 22c4.4 0 8-3.6 8-8 0-5-4-8-4-8s0 4-4 4c0-4-4-4-4-8C5.6 5.2 4 8.4 4 12c0 5.5 3.6 10 8 10Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"/>
      <path d="M12 22c2.2 0 4-2.2 4-5 0-2.8-4-5-4-5s-4 2.2-4 5c0 2.8 1.8 5 4 5Z" stroke="currentColor" strokeWidth={1.3} opacity={0.5}/>
    </svg>
  ),
  Chart: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth={1.5}/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round"/>
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
  Trash: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1.2 14H6.2L5 6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v5m4-5v5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  Edit: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/>
      <path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L11 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none">
      <path d="M2 2L9 9M9 2L2 9" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"/>
    </svg>
  ),
  TrendUp: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  TrendDown: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 18 23 18 23 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Sun: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth={1.8}/>
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/>
    </svg>
  ),
  Moon: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round"/>
    </svg>
  ),
  Tip: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6}/>
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// LIGHT MODE ICONS — playful, bold, hip-hop flavored
// ═══════════════════════════════════════════════════════════════════
const LightIcons = {
  Water: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 3C12 3 5 11 5 15.5a7 7 0 0 0 14 0C19 11 12 3 12 3Z" fill="currentColor" opacity={0.2}/>
      <path d="M12 3C12 3 5 11 5 15.5a7 7 0 0 0 14 0C19 11 12 3 12 3Z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinejoin="round"/>
      <path d="M9 17c.5-1.5 2-2 3-2" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
  Run: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="15" cy="4" r="2" fill="currentColor"/>
      <path d="M6 15l4-4 3 2 3-6 3 3" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M5 20l4-2M16 18l3 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
  Sleep: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M21 12.5A9 9 0 1 1 11.5 3.5 7 7 0 0 0 21 12.5Z" fill="currentColor" opacity={0.18}/>
      <path d="M21 12.5A9 9 0 1 1 11.5 3.5 7 7 0 0 0 21 12.5Z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinejoin="round"/>
      <path d="M14 9h4l-4 3.5h4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Meditate: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="4.5" r="2.5" fill="currentColor" opacity={0.3}/>
      <circle cx="12" cy="4.5" r="2.5" stroke="currentColor" strokeWidth={1.8} fill="none"/>
      <path d="M7 21c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none"/>
      <path d="M4 14l3.5-3m9 0 3.5 3" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
  Leaf: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 21V9M12 9C12 9 5 6 4.5 2c6 .5 7.5 4 7.5 7zM12 9c0 0 7-3 7.5-7-6 .5-7.5 4-7.5 7z" fill="currentColor" opacity={0.2}/>
      <path d="M12 21V9M12 9C12 9 5 6 4.5 2c6 .5 7.5 4 7.5 7zM12 9c0 0 7-3 7.5-7-6 .5-7.5 4-7.5 7z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  NoSugar: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity={0.12}/>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={2} fill="none"/>
      <path d="M5.5 5.5l13 13" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"/>
    </svg>
  ),
  Book: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 4C4 3 4.9 2 6 2h14v18H6a2 2 0 0 1-2-2V4Z" fill="currentColor" opacity={0.15}/>
      <path d="M4 4C4 3 4.9 2 6 2h14v18H6a2 2 0 0 1-2-2V4Z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinejoin="round"/>
      <path d="M4 17h14M8 7h8M8 11h5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"/>
    </svg>
  ),
  Steps: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M3 17l4.5-4.5 4 4 4.5-8.5 4.5 4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 21h18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"/>
      <circle cx="20" cy="13" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Target: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity={0.1}/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={1.8} fill="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  Flame: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 22c4 0 7-3.5 7-7.5 0-4.5-3.5-7-3.5-7s0 3-3 3.5c.5-3-3-5-3-7.5C7 5.5 5 8.5 5 12.5c0 5.5 3 9.5 7 9.5Z" fill="currentColor" opacity={0.25}/>
      <path d="M12 22c4 0 7-3.5 7-7.5 0-4.5-3.5-7-3.5-7s0 3-3 3.5c.5-3-3-5-3-7.5C7 5.5 5 8.5 5 12.5c0 5.5 3 9.5 7 9.5Z" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Chart: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth={2}/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"/>
      <circle cx="8.5" cy="15" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="15" r="1.2" fill="currentColor"/>
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"/>
    </svg>
  ),
  Trash: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1.2 14H6.2L5 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v5m4-5v5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"/>
    </svg>
  ),
  Edit: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
      <path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L11 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none">
      <path d="M2 2L9 9M9 2L2 9" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"/>
    </svg>
  ),
  TrendUp: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  TrendDown: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 18 23 18 23 12" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Sun: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity={0.3}/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} fill="none"/>
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
  Moon: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor" opacity={0.25}/>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Tip: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity={0.15}/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} fill="none"/>
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════
const STATUS = { DONE: "done", NOT_DONE: "not_done", EMPTY: "empty" };
function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getDayTip() {
  const d = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TIPS[d % TIPS.length];
}
function getThisMonthDays() {
  const now = new Date(); const year = now.getFullYear(); const month = now.getMonth();
  const n = new Date(year, month + 1, 0).getDate(); const days = [];
  for (let d = 1; d <= n; d++) { const date = new Date(year, month, d); days.push({ key: date.toISOString().split("T")[0], day: d, dow: date.getDay() }); }
  return days;
}
function calcDayScore(dayData) {
  if (!dayData) return null;
  const vals = Object.values(dayData);
  if (vals.every(v => v === STATUS.EMPTY)) return null;
  const done = vals.filter(v => v === STATUS.DONE).length;
  const total = vals.filter(v => v !== STATUS.EMPTY).length;
  return total === 0 ? null : Math.round((done / total) * 100);
}
function genId() { return "h_" + Math.random().toString(36).slice(2, 9); }

const ICON_KEYS = ["water","exercise","sleep","meditation","veggies","noSugar","reading","steps","target","flame","chart","calendar"];
const DEFAULT_HABITS = [
  { id: "water",      label: "Drink 8 glasses of water", iconKey: "water" },
  { id: "exercise",   label: "30 min exercise",           iconKey: "exercise" },
  { id: "sleep",      label: "8 hours sleep",             iconKey: "sleep" },
  { id: "meditation", label: "10 min meditation",         iconKey: "meditation" },
  { id: "veggies",    label: "Eat vegetables",            iconKey: "veggies" },
  { id: "noSugar",    label: "Avoid sugar",               iconKey: "noSugar" },
  { id: "reading",    label: "Read 20 minutes",           iconKey: "reading" },
  { id: "steps",      label: "10,000 steps",              iconKey: "steps" },
];
const TIPS = [
  "Start your morning with a full glass of water before coffee.",
  "A 10-minute walk after meals improves digestion.",
  "Sleep and nutrition are the most underrated performance tools.",
  "Consistency beats intensity — small daily habits compound.",
  "Breathing deeply for 2 minutes lowers cortisol measurably.",
  "Eating slowly reduces caloric intake by up to 20%.",
  "Morning sunlight anchors your circadian rhythm.",
  "Cold water on your face triggers the dive reflex — instant calm.",
  "Fiber intake directly improves gut microbiome diversity.",
  "Your worst day is still data. Log it honestly.",
  "Hydration improves focus more than most productivity hacks.",
  "Movement is non-negotiable — even 5 minutes counts.",
  "Rest is not laziness. Recovery is where strength is built.",
  "Social connection is a health metric too.",
];

function getIconSet(isDark) { return isDark ? DarkIcons : LightIcons; }
function getHabitIconComp(iconKey, isDark) {
  const set = getIconSet(isDark);
  const map = { water: set.Water, exercise: set.Run, sleep: set.Sleep, meditation: set.Meditate, veggies: set.Leaf, noSugar: set.NoSugar, reading: set.Book, steps: set.Steps, target: set.Target, flame: set.Flame, chart: set.Chart, calendar: set.Calendar };
  return map[iconKey] || set.Target;
}

// ═══════════════════════════════════════════════════════════════════
// ANIMATED THEME TOGGLE
// ═══════════════════════════════════════════════════════════════════
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{ position: "relative", width: 52, height: 28, borderRadius: 99, background: isDark ? "#7C6FFF" : "#FFB347", border: "none", cursor: "pointer", transition: "background 0.4s", flexShrink: 0, padding: 0 }}
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {/* Track icons */}
      <span style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", opacity: isDark ? 0 : 1, transition: "opacity 0.3s", color: "#fff" }}>
        {React.createElement(LightIcons.Sun, { size: 13 })}
      </span>
      <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", opacity: isDark ? 1 : 0, transition: "opacity 0.3s", color: "#fff" }}>
        {React.createElement(DarkIcons.Moon, { size: 13 })}
      </span>
      {/* Knob */}
      <span style={{ position: "absolute", top: 3, left: isDark ? 26 : 3, width: 22, height: 22, borderRadius: 99, background: "#fff", transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px #0003" }}>
        <span style={{ color: isDark ? "#7C6FFF" : "#FF9500", transition: "color 0.3s" }}>
          {isDark ? React.createElement(DarkIcons.Moon, { size: 12 }) : React.createElement(LightIcons.Sun, { size: 12 })}
        </span>
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// AURORA TRANSITION — flowing liquid blobs like the AI image effect
// ═══════════════════════════════════════════════════════════════════
function ParticleBurst({ isDark, onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Colors that match what's in the video: soft pink, lavender, teal, peach, lilac
    const PALETTES = {
      // going TO dark  → warm glowing aurora
      toDark:  ["#B16CEA","#FF6AC1","#FF9A3C","#43E8D8","#6C63FF","#FF6EE8","#1DFFA8"],
      // going TO light → pastel dreamy aurora
      toLight: ["#E8B4F8","#FFB3D9","#B3F0E8","#FFD6A5","#C3B1E1","#A8D8EA","#FFC8A2"],
    };
    const colors = isDark ? PALETTES.toDark : PALETTES.toLight;

    // Each blob: position, velocity, radius, color, noise offsets
    const BLOB_COUNT = 7;
    const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / BLOB_COUNT;
      const dist = 0.25 + Math.random() * 0.2; // start near center
      return {
        x: W * (0.5 + Math.cos(angle) * dist * 0.4),
        y: H * (0.5 + Math.sin(angle) * dist * 0.55),
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        r: W * (0.28 + Math.random() * 0.22),   // large soft blobs
        color: colors[i % colors.length],
        noiseX: Math.random() * 100,
        noiseY: Math.random() * 100,
        noiseSpeed: 0.012 + Math.random() * 0.01,
        alpha: 0,
      };
    });

    const TOTAL_FRAMES = 90;  // ~1.5s at 60fps
    const FADE_IN  = 18;      // frames to fade in
    const HOLD     = 54;      // frames fully visible
    const FADE_OUT = 18;      // frames to fade out
    let frame = 0;
    let raf;

    // Simple 2D noise substitute using sin waves
    function smoothNoise(x, t) {
      return Math.sin(x * 0.8 + t) * 0.5 + Math.sin(x * 1.3 + t * 1.4) * 0.3 + Math.sin(x * 2.1 + t * 0.7) * 0.2;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Global opacity envelope
      let globalAlpha;
      if (frame < FADE_IN) {
        globalAlpha = frame / FADE_IN;
      } else if (frame < FADE_IN + HOLD) {
        globalAlpha = 1;
      } else {
        globalAlpha = 1 - (frame - FADE_IN - HOLD) / FADE_OUT;
      }
      globalAlpha = Math.max(0, Math.min(1, globalAlpha));

      const t = frame * 0.04;

      blobs.forEach((b, i) => {
        // Organic drift using layered sin waves
        const nx = smoothNoise(b.noiseX, t + i);
        const ny = smoothNoise(b.noiseY + 50, t + i * 0.7);
        b.x += b.vx + nx * 1.4;
        b.y += b.vy + ny * 1.4;
        b.noiseX += b.noiseSpeed;
        b.noiseY += b.noiseSpeed * 0.8;

        // Wrap around edges softly
        if (b.x < -b.r * 0.5) b.x = W + b.r * 0.3;
        if (b.x > W + b.r * 0.5) b.x = -b.r * 0.3;
        if (b.y < -b.r * 0.5) b.y = H + b.r * 0.3;
        if (b.y > H + b.r * 0.5) b.y = -b.r * 0.3;

        // Pulsing radius
        const pulse = 1 + 0.08 * Math.sin(t * 1.5 + i * 1.1);
        const r = b.r * pulse;

        // Radial gradient blob — very soft, large, like the video
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0,   b.color + "CC");
        grad.addColorStop(0.4, b.color + "88");
        grad.addColorStop(0.75,b.color + "33");
        grad.addColorStop(1,   b.color + "00");

        ctx.globalAlpha = globalAlpha * 0.82;
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Add a subtle overall color wash sweep — the "wipe" feel from the video
      const sweepX = (frame / TOTAL_FRAMES) * W * 1.6 - W * 0.3;
      const sweepGrad = ctx.createLinearGradient(sweepX - W * 0.5, 0, sweepX + W * 0.5, H);
      const sweepColor = isDark ? "#9B8FFF" : "#D4AAFF";
      sweepGrad.addColorStop(0,   sweepColor + "00");
      sweepGrad.addColorStop(0.4, sweepColor + "22");
      sweepGrad.addColorStop(0.6, sweepColor + "18");
      sweepGrad.addColorStop(1,   sweepColor + "00");
      ctx.globalAlpha = globalAlpha * 0.35;
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      frame++;
      if (frame < TOTAL_FRAMES) {
        raf = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
        mixBlendMode: "normal",
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// CHART COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function Sparkline({ data, color, trackColor, height = 36, width = 130 }) {
  const pts = data.map((v, i) => ({ x: (i / Math.max(data.length - 1, 1)) * width, y: v === null ? null : height - (v / 100) * height })).filter(p => p.y !== null);
  if (pts.length < 2) return <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: trackColor }}>—</span></div>;
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length-1].x},${height} L${pts[0].x},${height} Z`;
  const gid = `sg${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`}/>
      <path d={path} stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r={3.5} fill={color}/>
    </svg>
  );
}

function BarChart({ data, labels, color, trackColor, height = 52 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: v !== null ? `${(v / 100) * 100}%` : "2px", background: v !== null ? color : trackColor, borderRadius: "2px 2px 0 0", minHeight: 2, opacity: v !== null ? 1 : 0.3, transition: "height 0.4s" }}/>
          </div>
          {labels && <div style={{ fontSize: 8, color: trackColor, whiteSpace: "nowrap" }}>{labels[i]}</div>}
        </div>
      ))}
    </div>
  );
}

function Ring({ value, max, color, trackColor, size = 52, stroke = 4, children }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }}/>
      {children}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD SLIDES
// ═══════════════════════════════════════════════════════════════════
function DashSlide1({ stats, tip, T, isDark }) {
  const I = getIconSet(isDark);
  return (
    <div style={{ width: "100%", flexShrink: 0 }}>
      {/* Stat row */}
      <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
        {[
          { label: "Today", value: `${stats.todayScore}%`, sub: `${stats.done}/${stats.total} done`, color: stats.todayScore >= 80 ? T.green : stats.todayScore >= 50 ? T.amber : T.red, trend: stats.todayScore - stats.avgScore },
          { label: "Streak", value: stats.streak, sub: "days", color: T.amber },
          { label: "Avg / mo", value: `${stats.avgScore}%`, sub: "this month", color: T.accent },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "12px 12px", borderRight: i < 2 ? `1px solid ${T.border}` : "none", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: 21, fontWeight: 900, color: s.color, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {s.trend !== undefined && <span style={{ color: s.trend >= 0 ? T.green : T.red }}>{s.trend >= 0 ? <I.TrendUp/> : <I.TrendDown/>}</span>}
              <span style={{ fontSize: 10, color: T.dim }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Progress bars */}
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 9 }}>
        {[
          { label: "Today", val: stats.todayScore, color: T.accent },
          { label: "Monthly", val: stats.avgScore, color: T.green },
          { label: "Logged", val: Math.min(Math.round((stats.totalDaysLogged / 30) * 100), 100), color: T.amber },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 56, fontSize: 10, color: T.dim }}>{label}</div>
            <div style={{ flex: 1, height: 5, background: T.border }}>
              <div style={{ height: "100%", width: `${val}%`, background: color, transition: "width 0.5s" }}/>
            </div>
            <div style={{ width: 32, fontSize: 11, color, fontWeight: 800, textAlign: "right" }}>{val}%</div>
          </div>
        ))}
      </div>
      {/* Tip */}
      <div style={{ padding: "11px 14px", display: "flex", gap: 9, alignItems: "flex-start" }}>
        <span style={{ color: T.green, flexShrink: 0, marginTop: 1 }}><I.Tip/></span>
        <span style={{ fontSize: 12, color: T.textSub, lineHeight: 1.6 }}><span style={{ color: T.green, fontWeight: 700 }}>Today · </span>{tip}</span>
      </div>
    </div>
  );
}

function DashSlide2({ monthDays, allData, stats, T, isDark }) {
  const I = getIconSet(isDark);
  const last7 = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today); d.setDate(d.getDate() - (6 - i));
      const k = d.toISOString().split("T")[0];
      return { score: calcDayScore(allData[k]), label: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2) };
    });
  }, [allData]);
  const monthScores = useMemo(() => monthDays.map(d => calcDayScore(allData[d.key])), [monthDays, allData]);
  const bestDay = useMemo(() => {
    let best = null, bestScore = -1;
    monthDays.forEach(d => { const s = calcDayScore(allData[d.key]); if (s !== null && s > bestScore) { bestScore = s; best = d; } });
    return best ? { score: bestScore, label: new Date(best.key + "T00:00").toLocaleDateString("en", { weekday: "short", day: "numeric" }) } : null;
  }, [allData, monthDays]);

  return (
    <div style={{ width: "100%", flexShrink: 0 }}>
      {/* Top row */}
      <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ flex: 1, padding: "11px 12px", borderRight: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>Month Trend</div>
          <Sparkline data={monthScores} color={T.accent} trackColor={T.border} height={36} width={130}/>
        </div>
        <div style={{ flex: 1, padding: "11px 12px", borderRight: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 5 }}>Best Day</div>
          {bestDay ? <>
            <div style={{ fontSize: 21, fontWeight: 900, color: T.green, lineHeight: 1 }}>{bestDay.score}%</div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 3 }}>{bestDay.label}</div>
          </> : <div style={{ fontSize: 11, color: T.dim }}>No data</div>}
        </div>
        <div style={{ flex: 1, padding: "11px 12px" }}>
          <div style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 5 }}>Logged</div>
          <div style={{ fontSize: 21, fontWeight: 900, color: T.amber, lineHeight: 1 }}>{stats.totalDaysLogged}</div>
          <div style={{ fontSize: 10, color: T.dim, marginTop: 3 }}>days total</div>
        </div>
      </div>
      {/* Bar chart */}
      <div style={{ padding: "11px 14px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>Last 7 Days</div>
        <BarChart data={last7.map(d => d.score)} labels={last7.map(d => d.label)} color={T.green} trackColor={T.border} height={52}/>
      </div>
      {/* Rings */}
      <div style={{ display: "flex", gap: 18, padding: "11px 14px", alignItems: "center" }}>
        {[
          { val: stats.streak, max: 30, color: T.amber, label: "Streak", unit: "d" },
          { val: stats.avgScore, max: 100, color: T.accent, label: "Avg", unit: "%" },
          { val: stats.done, max: Math.max(stats.total, 1), color: T.pink, label: "Done", unit: "" },
        ].map(({ val, max, color, label, unit }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Ring value={val} max={max} color={color} trackColor={T.border} size={52} stroke={4}>
              <text x={26} y={31} textAnchor="middle" fill={T.text} fontSize={11} fontWeight={800} fontFamily="Inter">{val}{unit}</text>
            </Ring>
            <span style={{ fontSize: 9, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardCarousel({ stats, tip, monthDays, allData, T, isDark }) {
  const [slide, setSlide] = useState(0);
  const I = getIconSet(isDark);
  return (
    <div style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
        {[{ icon: <I.Chart size={13}/>, label: "Overview" }, { icon: <I.TrendUp size={12}/>, label: "Analytics" }].map((tab, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", background: "none", border: "none", borderBottom: `2px solid ${slide === i ? T.accent : "transparent"}`, color: slide === i ? T.text : T.dim, fontSize: 11, fontWeight: slide === i ? 800 : 500, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
            <span style={{ opacity: slide === i ? 1 : 0.5 }}>{tab.icon}</span>{tab.label}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 14px" }}>
          {[0, 1].map(i => <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 16 : 5, height: 5, borderRadius: 99, background: i === slide ? T.accent : T.border, transition: "all 0.2s", cursor: "pointer" }}/>)}
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", transform: `translateX(-${slide * 100}%)`, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
          <DashSlide1 stats={stats} tip={tip} T={T} isDark={isDark}/>
          <DashSlide2 monthDays={monthDays} allData={allData} stats={stats} T={T} isDark={isDark}/>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════════════
function AddHabitModal({ onAdd, onClose, T, isDark }) {
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("target");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const submit = () => { const t = label.trim(); if (!t) return; onAdd({ id: genId(), label: t, iconKey }); onClose(); };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 600, background: T.card, borderTop: `2px solid ${T.accent}`, animation: "slideUp 0.22s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>New Habit</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.dim, fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 9, color: T.dim, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Pick Icon</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ICON_KEYS.map(key => {
              const Ic = getHabitIconComp(key, isDark);
              return (
                <button key={key} onClick={() => setIconKey(key)} style={{ width: 36, height: 36, background: iconKey === key ? T.accentBg : T.bg, border: `1px solid ${iconKey === key ? T.accent : T.border}`, color: iconKey === key ? T.accent : T.dim, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s" }}>
                  <Ic size={16}/>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 9, color: T.dim, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Label</div>
          <input ref={inputRef} value={label} onChange={e => setLabel(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="e.g. No screens after 10 PM"
            style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: "10px 12px", color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}/>
        </div>
        <div style={{ padding: "12px 16px 24px" }}>
          <button onClick={submit} disabled={!label.trim()} style={{ width: "100%", padding: "12px", border: "none", background: label.trim() ? T.accent : T.border, color: label.trim() ? "#fff" : T.dim, fontSize: 12, fontWeight: 800, cursor: label.trim() ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ habit, onConfirm, onClose, T, isDark }) {
  const Ic = getHabitIconComp(habit.iconKey, isDark);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#00000088", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.card, border: `1px solid ${T.border}`, maxWidth: 320, width: "100%" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Delete Habit</span>
        </div>
        <div style={{ padding: "18px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, background: T.redBg, border: `1px solid ${T.red}44`, display: "flex", alignItems: "center", justifyContent: "center", color: T.red }}><Ic size={16}/></div>
            <span style={{ fontSize: 13, color: T.text, fontWeight: 700 }}>{habit.label}</span>
          </div>
          <p style={{ fontSize: 12, color: T.dim, margin: 0, lineHeight: 1.6 }}>Removed from future tracking. Past data is kept.</p>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "none", border: "none", borderRight: `1px solid ${T.border}`, color: T.dim, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "11px", background: T.red, border: "none", color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em" }}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HEATMAP
// ═══════════════════════════════════════════════════════════════════
function Heatmap({ monthDays, allData, todayKey, T }) {
  const firstDow = monthDays[0]?.dow || 0;
  const grid = [...Array(firstDow).fill(null), ...monthDays];
  const DOW = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const scoreColor = s => s === null ? T.border : s >= 80 ? T.green : s >= 60 ? (T.green + "AA") : s >= 40 ? T.amber : T.red;
  const rows = [];
  for (let i = 0; i < grid.length; i += 7) rows.push(grid.slice(i, i + 7));
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}` }}>
      <div style={{ padding: "9px 14px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {new Date().toLocaleString("default",{month:"long"})} {new Date().getFullYear()} — Activity Grid
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
          {DOW.map(d => <div key={d} style={{ width: 14, fontSize: 8, color: T.muted, textAlign: "center", fontFamily: "monospace" }}>{d}</div>)}
        </div>
        {rows.map((week, ri) => (
          <div key={ri} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
            {week.map((cell, ci) => cell === null
              ? <div key={ci} style={{ width: 14, height: 14 }}/>
              : <div key={cell.key} title={`${cell.key}: ${calcDayScore(allData[cell.key]) ?? "—"}%`}
                  style={{ width: 14, height: 14, background: scoreColor(calcDayScore(allData[cell.key])), opacity: calcDayScore(allData[cell.key]) === null ? 0.25 : 1, outline: cell.key === todayKey ? `2px solid ${T.accent}` : "none", outlineOffset: -1, cursor: "default" }}/>
            )}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
          <span style={{ fontSize: 9, color: T.muted }}>0%</span>
          {[T.border, T.red, T.amber, T.green+"AA", T.green].map((c, i) => <div key={i} style={{ width: 10, height: 10, background: c }}/>)}
          <span style={{ fontSize: 9, color: T.muted }}>100%</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DATA TABLE
// ═══════════════════════════════════════════════════════════════════
function DataTable({ monthDays, allData, habits, todayKey, T, isDark }) {
  const cols = habits.slice(0, 4);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}` }}>
      <div style={{ padding: "9px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Full Month Log</span>
        <span style={{ fontSize: 9, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Read-only</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "36px 90px 1fr repeat(4,24px) 44px", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
        {["#","Date","",...cols.map(()=>""),"Score"].map((h, i) => (
          <div key={i} style={{ padding: "7px 8px", fontSize: 9, color: T.dim, fontWeight: 800, textAlign: i > 2 ? "center" : "left", letterSpacing: "0.08em", textTransform: "uppercase", borderRight: i < 7 ? `1px solid ${T.border}` : "none" }}>
            {i >= 3 && i <= 6 && cols[i-3]
              ? <div style={{ color: T.accent, display: "flex", justifyContent: "center" }}>{React.createElement(getHabitIconComp(cols[i-3].iconKey, isDark), { size: 12 })}</div>
              : h}
          </div>
        ))}
      </div>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {monthDays.map(({ key, day }, idx) => {
          const dayData = allData[key];
          const score = calcDayScore(dayData);
          const isToday = key === todayKey;
          const isFuture = new Date(key) > new Date();
          const scoreColor = score === null ? T.muted : score >= 80 ? T.green : score >= 50 ? T.amber : T.red;
          return (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "36px 90px 1fr repeat(4,24px) 44px", borderBottom: `1px solid ${T.border}`, background: isToday ? T.accentBg : "transparent", alignItems: "center" }}>
              <div style={{ padding: "7px 8px", fontSize: 11, fontFamily: "monospace", color: isToday ? T.accent : T.muted, fontWeight: isToday ? 800 : 400, borderRight: `1px solid ${T.border}`, textAlign: "center" }}>{String(day).padStart(2,"0")}</div>
              <div style={{ padding: "7px 8px", fontSize: 10, color: isToday ? T.text : T.muted, fontFamily: "monospace", borderRight: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 4 }}>
                {new Date(key+"T00:00").toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}
                {isToday && <span style={{ fontSize: 8, background: T.accent, color:"#fff", padding:"1px 4px", fontFamily:"Inter", fontWeight:800 }}>NOW</span>}
              </div>
              <div style={{ borderRight: `1px solid ${T.border}` }}/>
              {cols.map(habit => {
                const s = dayData?.[habit.id] || STATUS.EMPTY;
                return (
                  <div key={habit.id} style={{ borderRight: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", padding: "7px 0" }}>
                    <div style={{ width: 8, height: 8, background: s === STATUS.DONE ? T.green : s === STATUS.NOT_DONE ? T.red : T.border, opacity: isFuture ? 0.2 : 1 }}/>
                  </div>
                );
              })}
              <div style={{ padding: "7px 8px", textAlign: "center" }}>
                {isFuture ? <span style={{ color: T.border }}>—</span> : <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 800, color: scoreColor }}>{score !== null ? `${score}%` : "—"}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 12, padding: "8px 14px", borderTop: `1px solid ${T.border}`, background: T.bg }}>
        {[{color:T.green,label:"Done"},{color:T.red,label:"Missed"},{color:T.border,label:"Empty"}].map(({color,label}) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, background: color }}/>
            <span style={{ fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function HealthTracker() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("ht_theme") !== "light"; } catch { return true; }
  });
  const [showBurst, setShowBurst] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const [habits, setHabits] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ht_habits2") || "null") || DEFAULT_HABITS; }
    catch { return DEFAULT_HABITS; }
  });
  const [allData, setAllData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ht_data") || "{}"); }
    catch { return {}; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTgt, setDeleteTgt] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const T = THEMES[isDark ? "dark" : "light"];
  const I = getIconSet(isDark);
  const todayKey = getTodayKey();
  const tip = getDayTip();
  const monthDays = getThisMonthDays();
  const now = new Date();

  const todayData = useMemo(() => {
    const base = {}; habits.forEach(h => (base[h.id] = STATUS.EMPTY));
    return { ...base, ...(allData[todayKey] || {}) };
  }, [allData, todayKey, habits]);

  useEffect(() => { localStorage.setItem("ht_data", JSON.stringify(allData)); }, [allData]);
  useEffect(() => { localStorage.setItem("ht_habits2", JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem("ht_theme", isDark ? "dark" : "light"); }, [isDark]);

  const handleToggleTheme = () => {
    if (transitioning) return;
    setTransitioning(true);
    setShowBurst(true);
    // Switch theme at peak aurora fill (~600ms in) — aurora is 1500ms total
    setTimeout(() => { setIsDark(d => !d); }, 600);
  };

  const cycleStatus = useCallback((habitId) => {
    if (editMode) return;
    const cur = todayData[habitId] || STATUS.EMPTY;
    const next = cur === STATUS.EMPTY ? STATUS.DONE : cur === STATUS.DONE ? STATUS.NOT_DONE : STATUS.EMPTY;
    setAllData(prev => ({ ...prev, [todayKey]: { ...todayData, [habitId]: next } }));
  }, [editMode, todayData, todayKey]);

  const addHabit = h => setHabits(p => [...p, h]);
  const deleteHabit = h => { setHabits(p => p.filter(x => x.id !== h.id)); setDeleteTgt(null); setEditMode(false); };

  const stats = useMemo(() => {
    const scores = monthDays.map(d => calcDayScore(allData[d.key])).filter(s => s !== null);
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = d.toISOString().split("T")[0];
      const s = calcDayScore(allData[k]);
      if (s !== null && s > 0) streak++; else if (i > 0) break;
    }
    const todayScore = calcDayScore(todayData) || 0;
    const totalDaysLogged = Object.keys(allData).filter(k => calcDayScore(allData[k]) !== null).length;
    const done = Object.values(todayData).filter(v => v === STATUS.DONE).length;
    return { avgScore, streak, todayScore, totalDaysLogged, done, total: habits.length };
  }, [allData, todayData, monthDays, habits]);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: T.text, transition: "background 0.4s, color 0.4s" }}>

      {/* Particle burst */}
      {showBurst && <ParticleBurst isDark={!isDark} onDone={() => { setShowBurst(false); setTransitioning(false); }}/>}

      {/* ── App Header ── */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 48, position: "sticky", top: 0, zIndex: 100, transition: "background 0.4s, border-color 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 5, height: 20, background: T.accent, transition: "background 0.4s" }}/>
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>Health</span>
          <span style={{ fontSize: 9, color: T.dim, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: T.border, padding: "2px 6px", transition: "all 0.4s" }}>Tracker</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: T.dim, fontFamily: "monospace" }}>
            {now.toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}
          </span>
          <ThemeToggle isDark={isDark} onToggle={handleToggleTheme}/>
        </div>
      </div>

      {/* ── Dashboard Carousel ── */}
      <DashboardCarousel stats={stats} tip={tip} monthDays={monthDays} allData={allData} T={T} isDark={isDark}/>

      <div style={{ paddingBottom: 60 }}>

        {/* ── Habits ── */}
        <div style={{ margin: "14px 14px 0" }}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderBottom: "none", transition: "background 0.4s" }}>
            {/* Header */}
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 14, background: T.accent }}/>
                <span style={{ fontSize: 10, fontWeight: 800, color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Today's Habits</span>
                <span style={{ fontSize: 9, background: T.accentBg, color: T.accent, padding: "2px 7px", fontWeight: 800 }}>{stats.done}/{stats.total}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setEditMode(v => !v)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: editMode ? T.redBg : "none", border: `1px solid ${editMode ? T.red + "55" : T.border}`, color: editMode ? T.red : T.dim, fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <I.Edit size={13}/>{editMode ? "Done" : "Edit"}
                </button>
                <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: T.accentBg, border: `1px solid ${T.accent}55`, color: T.accent, fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <I.Plus size={13}/>Add
                </button>
              </div>
            </div>
            {/* Column labels */}
            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 60px", padding: "5px 14px", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
              <div style={{ fontSize: 8, color: T.muted, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Icon</div>
              <div style={{ fontSize: 8, color: T.muted, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Habit</div>
              <div style={{ fontSize: 8, color: T.muted, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center" }}>Status</div>
            </div>
            {habits.length === 0 && (
              <div style={{ padding: "28px 14px", textAlign: "center", color: T.dim, fontSize: 12 }}>
                No habits. <span onClick={() => setShowAdd(true)} style={{ color: T.accent, cursor: "pointer" }}>Add one →</span>
              </div>
            )}
            {habits.map((habit, idx) => {
              const status = todayData[habit.id] || STATUS.EMPTY;
              const Ic = getHabitIconComp(habit.iconKey, isDark);
              const isLast = idx === habits.length - 1;
              return (
                <div key={habit.id} style={{ display: "flex", alignItems: "stretch", borderBottom: isLast ? "none" : `1px solid ${T.border}`, background: status === STATUS.DONE ? T.greenBg : status === STATUS.NOT_DONE ? T.redBg : "transparent", transition: "background 0.2s" }}>
                  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${T.border}`, color: status === STATUS.DONE ? T.green : status === STATUS.NOT_DONE ? T.red : T.muted, flexShrink: 0 }}>
                    <Ic size={18}/>
                  </div>
                  <button onClick={() => cycleStatus(habit.id)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "none", border: "none", cursor: editMode ? "default" : "pointer", textAlign: "left", minWidth: 0 }}>
                    <div style={{ width: 20, height: 20, border: `2px solid ${status === STATUS.EMPTY ? T.muted : status === STATUS.DONE ? T.green : T.red}`, background: status === STATUS.DONE ? T.green : status === STATUS.NOT_DONE ? T.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {status === STATUS.DONE && <span style={{ color: "#fff" }}><I.Check size={13}/></span>}
                      {status === STATUS.NOT_DONE && <span style={{ color: "#fff" }}><I.X size={11}/></span>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: status === STATUS.EMPTY ? T.dim : T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" }}>{habit.label}</span>
                  </button>
                  {editMode ? (
                    <button onClick={() => setDeleteTgt(habit)} style={{ width: 44, background: "none", border: "none", borderLeft: `1px solid ${T.border}`, color: T.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <I.Trash size={14}/>
                    </button>
                  ) : (
                    <div style={{ width: 60, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${T.border}`, flexShrink: 0 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: status === STATUS.DONE ? T.green : status === STATUS.NOT_DONE ? T.red : T.border }}>
                        {status === STATUS.DONE ? "Done" : status === STATUS.NOT_DONE ? "Skip" : "—"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 7 }}>
            {[{color:T.green,label:"Done"},{color:T.red,label:"Not done"},{color:T.border,label:"Not filled"}].map(({color,label}) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, background: color }}/>
                <span style={{ fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div style={{ margin: "14px 14px 0" }}>
          <Heatmap monthDays={monthDays} allData={allData} todayKey={todayKey} T={T}/>
        </div>

        {/* ── Data Table ── */}
        <div style={{ margin: "14px 14px 0" }}>
          <DataTable monthDays={monthDays} allData={allData} habits={habits} todayKey={todayKey} T={T} isDark={isDark}/>
        </div>
      </div>

      {showAdd && <AddHabitModal onAdd={addHabit} onClose={() => setShowAdd(false)} T={T} isDark={isDark}/>}
      {deleteTgt && <DeleteModal habit={deleteTgt} onConfirm={() => deleteHabit(deleteTgt)} onClose={() => setDeleteTgt(null)} T={T} isDark={isDark}/>}
    </div>
  );
}
