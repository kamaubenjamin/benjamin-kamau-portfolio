/**
 * Environment for the narrow Benkai API Worker that serves `/api/chat` and
 * `/api/chat/analytics`.
 *
 * The Worker never renders pages: every public route is a static asset, so this
 * runtime only handles the two dynamic assistant endpoints. Bindings declared in
 * `wrangler.jsonc` (ASSETS, BENKAI_ANALYTICS, NEXT_PUBLIC_SITE_URL, GEMINI_MODEL)
 * come from `cloudflare-env.d.ts`; the API key is a Worker secret.
 */
export type BenkaiEnv = CloudflareEnv & {
  /** Server-side only. Never exposed to the browser. */
  GEMINI_API_KEY?: string;
};
