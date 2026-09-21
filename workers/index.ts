import { handleChatAnalyticsRequest } from "./chat-analytics";
import { handleChatRequest } from "./chat";
import type { BenkaiEnv } from "./env";

const CHAT_PATH = "/api/chat";
const CHAT_ANALYTICS_PATH = "/api/chat/analytics";

function methodNotAllowed(allow: string): Response {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405,
    headers: { Allow: allow, "Cache-Control": "no-store", "Content-Type": "application/json" },
  });
}

function apiNotFound(): Response {
  return new Response(JSON.stringify({ error: "Not found." }), {
    status: 404,
    headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
  });
}

/**
 * Narrow Benkai API Worker.
 *
 * `wrangler.jsonc` runs this Worker first only for `/api/*`. Every public page,
 * project case study, generated metadata route, static asset and the custom 404
 * page is served by the Cloudflare static asset layer without invoking this
 * script, so no request-time Next.js server, SSR handler or middleware runs for
 * normal page traffic.
 *
 * This script never renders HTML. Requests that are not Assistant API calls are
 * delegated straight to the static asset binding.
 */
export default {
  async fetch(request: Request, env: BenkaiEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === CHAT_PATH) {
      if (request.method !== "POST") return methodNotAllowed("POST");
      return handleChatRequest(request, env);
    }

    if (pathname === CHAT_ANALYTICS_PATH) {
      if (request.method !== "POST") return methodNotAllowed("POST");
      return handleChatAnalyticsRequest(request, env);
    }

    if (pathname.startsWith("/api/")) return apiNotFound();

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<BenkaiEnv>;
