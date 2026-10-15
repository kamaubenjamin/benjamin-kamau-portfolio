# Business website deployment and rollback

## Official deployment path

The official website is `https://benkaisystems.co.ke`, served by Worker
`benkai-systems-business` in account `a9968e365a6bee7bb86a380662067095`.
From `C:\Data Engineering\benjamin-kamau-portfolio`, use:

```powershell
npm run cf:business:check
npm run cf:business:deploy
```

The check is read-only. The deployment command checks the explicit business
configuration and authenticated account membership before building, builds with
the official origin, checks again before deployment, and invokes Wrangler with
`--config wrangler.business.jsonc` and the pinned business account ID.
Authentication failures, account mismatches, configuration mismatches, a selected
`CLOUDFLARE_ENV`, or additional deployment arguments stop execution. It never
logs in, switches accounts, or falls back to `wrangler.jsonc`.

For GitHub/Cloudflare build automation, install dependencies with `npm ci` and use
`npm run cf:business:deploy` as the deployment command. Supply business-account
authentication through the deployment platform's encrypted secrets, never Git.
This repository change does not enable an automatic build integration or deploy.

The Web3Forms identifier in `cf:business:build` is intentionally public: it is
embedded in the browser bundle and matches the business site's existing form.
It is not a Cloudflare API token or the Gemini runtime secret.
`GEMINI_API_KEY` remains an encrypted Cloudflare runtime secret; do not put its
value in configuration, Git, build arguments, or documentation. Normal code
deployments retain existing runtime secrets. Keep `BENKAI_ANALYTICS` bound to
`benkai_assistant_events`; do not create a replacement dataset or change plans.

The architecture remains a Next.js static export in `out/`, with only `/api/*`
running Worker code. Generated assets, local environment files and credentials
must remain ignored and uncommitted.

The legacy `wrangler.jsonc` and `cf:deploy` command are preserved for the personal
Worker `benkai-systems` in account `88282d780270d0a574ff0253667c9305`.
They are not the business deployment path. Do not run them for the business site.

## Business rollback

### Assistant provider (2026-10-15)

Business configuration pins `CHAT_PROVIDER=groq` and `GROQ_MODEL=openai/gpt-oss-120b`.
Install `GROQ_API_KEY` only as an encrypted business Worker secret. Keep
`GEMINI_API_KEY` and `GEMINI_MODEL` for rollback. No subscription or new service
is introduced; free-tier capacity is limited and uptime is not guaranteed.

Console-confirmed organization/project: BenKai Systems. Organization Free limits:
30 RPM, 1,000 RPD, 8,000 TPM, 200,000 TPD. Authenticated response headers confirm
1,000 requests/day and 8,000 tokens/minute. Project overrides and billing status
are not independently accessible with the inference key. Context capacity is not
daily allowance. Each Groq request allows 1,200 completion tokens, keeps the full
company system prompt, and drops oldest complete history turns above 2,000 UTF-8
bytes. Rate-limit responses are sanitized and never automatically retried.

The legacy `geminiTurns` request/storage field continues counting all provider
answers to preserve the existing four-answer session budget and stored sessions.
Groq analytics use `chat_groq_request` / `chat_groq_answer` with source `groq`;
existing Gemini events remain valid. Include both event pairs in historical queries.

For immediate pre-migration rollback, first run `npm run cf:business:check`, then:

```powershell
npx wrangler rollback d3ea5fc1-088b-48f4-a838-6b5b1f5602f4 --config wrangler.business.jsonc --message "Rollback Groq migration"
```

Also revert the migration commit before the next guarded deployment; otherwise
the pinned business configuration will re-enable Groq. Do not delete either secret.

Acceptance: Worker version `2d6c9984-bc7a-44d4-ab7d-c57a5d364564` returned a
genuine `source: groq` production answer in 1,081 ms. Chrome automation submitted
an open-ended question through the existing UI, observed HTTP 200 / `source: groq`,
confirmed the answer in the rendered DOM, two stored conversation messages and
the legacy session counter incremented to one, with no browser exceptions.
Main pages returned 200; local founder answer, 400 validation, 429 session budget
and 204 analytics checks passed. A 15-second Worker tail observed two `ok`
invocations and no exceptions. Focused tests: 20/20; TypeScript, ESLint and guarded
production build passed. Contact form source is unchanged; built form, endpoint
and public business identifier are preserved. No live enquiry was sent, and
Analytics Engine persisted rows were not independently queried.

Only operate on account `a9968e365a6bee7bb86a380662067095` and Worker
`benkai-systems-business`. Confirm `wrangler whoami` before execution.

Pre-branding release: `b6178646-f8a2-4cdb-b00f-6d2e462576c5`.
It contains the business form identifier and Gemini secret.

From `C:\Data Engineering\benjamin-kamau-portfolio`, the rollback command is:

```powershell
npx wrangler rollback b6178646-f8a2-4cdb-b00f-6d2e462576c5 --config wrangler.business.jsonc --message "Rollback business release"
```

Review the confirmation before applying. Verify active secrets, bindings,
HTTPS pages and Assistant afterwards. Do not deploy the personal configuration.

If a Custom Domain is subsequently attached and must be withdrawn, remove only
that domain association from this business Worker through Settings > Domains &
Routes. Coordinate DNS rollback with the recorded pre-attachment state; do not
change unrelated records, nameservers or DNSSEC.

The original personal Worker remains operational and must not be modified.
No legacy redirect is authorized by this release.