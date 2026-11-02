/**
 * The site's public origin, used for canonical URLs, the sitemap and share images.
 * Set NEXT_PUBLIC_SITE_URL once you have a custom domain; on Vercel the production
 * URL is picked up automatically.
 */
export function siteUrl(env: Record<string, string | undefined> = process.env): string {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
