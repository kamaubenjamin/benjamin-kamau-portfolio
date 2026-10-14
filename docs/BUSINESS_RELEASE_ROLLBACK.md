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