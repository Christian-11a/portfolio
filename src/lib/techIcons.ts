import {
  siCloudflare,
  siCloudflareworkers,
  siCplusplus,
  siCss,
  siExpo,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRadixui,
  siSqlite,
  siReact,
  siReactrouter,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  type SimpleIcon,
} from "simple-icons";

/** Brand logos for stack items. Items without an entry render as text only. */
const icons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  Python: siPython,
  "C++": siCplusplus,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Vite: siVite,
  "React Router": siReactrouter,
  GSAP: siGsap,
  "Radix UI": siRadixui,
  "React Native": siReact,
  Expo: siExpo,
  "Node.js": siNodedotjs,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  Firebase: siFirebase,
  Git: siGit,
  GitHub: siGithub,
  Figma: siFigma,
  Vercel: siVercel,
  Cloudflare: siCloudflare,
  "Cloudflare Workers": siCloudflareworkers,
  SQLite: siSqlite,
  Vitest: siVitest,
  Stripe: siStripe,
};

/** Relative luminance of a hex color, 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Icon path plus a hover color that stays visible in both themes. */
export function techIcon(name: string): { path: string; hover: string } | null {
  const icon = icons[name];
  if (!icon) return null;
  const l = luminance(icon.hex);
  // Near-black or near-white brand colors disappear in one theme, so use the text color instead.
  const hover = l < 0.06 || l > 0.85 ? "var(--fg)" : `#${icon.hex}`;
  return { path: icon.path, hover };
}
