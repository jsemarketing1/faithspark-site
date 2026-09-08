// Static replacement for faithspark-web's ThemeContext (which offered 4 selectable
// palettes). Ported app pages use faithspark-site's own green/gold/cream palette
// instead, referenced through this same `C.xxx` shape so ported component bodies
// didn't need per-line rewriting.
export const C = {
  bg: "#F9F6F0",
  surface: "#ffffff",
  hi: "#EEF5F0",
  hi2: "#E3EEE7",
  border: "#D8E4DC",
  border2: "#c3d6cb",
  f1: "#C8762A",
  f2: "#E8943A",
  f3: "#F5C56B",
  accent: "#7C5CBF",
  accentL: "#A07DD4",
  text: "#2C3E30",
  muted: "#6B7B6E",
  dim: "#9BAAA0",
  green: "#2D6A4F",
  red: "#C0392B",
  gold: "#C8762A",
  shadow: "rgba(26,43,31,0.12)",
  onPrimary: "#ffffff",
} as const;
