# Benkai Assistant — Anonymous Usage Analytics

This is an owner-facing operational reference for the privacy-safe usage analytics added to the
Benkai Assistant. It is not user-facing and contains no API tokens or credentials.

## What is tracked

Aggregate, anonymous usage events. Each event is one row written through a Cloudflare Workers
Analytics Engine dataset binding:

- Dataset name: `benkai_assistant_events`
- Binding name: `BENKAI_ANALYTICS`

### Event names

| Event | When it fires |
|---|---|
| `chat_open` | Assistant launcher opened |
| `starter_prompt_click` | A starter prompt button was clicked |
| `chat_local_answer` | A grounded local answer was served (0 Gemini calls) |
| `chat_gemini_request` | A Gemini-backed request was sent |
| `chat_gemini_answer` | A Gemini-backed answer succeeded |
| `chat_retry` | The visitor used "Try again" |
| `chat_error` | A provider error surfaced |
| `chat_quota_limit` | Google free-tier quota (HTTP 429) was reached |
| `chat_session_limit` | The per-session Gemini budget was reached |
| `chat_contact_click` | A visitor clicked through to Contact |

Answer-provider events are written server-side. The UI-only events (`chat_open`,
`starter_prompt_click`, `chat_retry`, `chat_contact_click`) are posted by the client to the
same-origin `/api/chat/analytics` endpoint and validated against a strict allowlist.

## What is deliberately NOT tracked

- User message text
- Assistant response text
- Full conversation content
- Contact form content
- Email addresses or phone numbers
- The Gemini prompt/context
- The Gemini API key
- IP addresses copied into analytics fields

Only event metadata is stored.

## Anonymous session identifier

The browser generates a random UUID (`crypto.randomUUID()` when available) per browser tab and
stores it only in `sessionStorage`. It is sent with events solely to estimate anonymous unique
chat sessions. It is not derived from identity or user content, and it is not retained
server-side beyond the analytics row. Each new tab/session may receive a new identifier.

## Analytics Engine schema

Writes use this fixed column layout (order is important — multiple events share the same row
shape):

| Column | Field |
|---|---|
| index1 | Anonymous session UUID |
| blob1 | event name |
| blob2 | answer source: `local_grounded`, `gemini`, or empty |
| blob3 | project slug (only when triggered by an explicit known project intent) |
| blob4 | outcome category (e.g. `success`, `quota`, `session_budget`, `provider_failure`) |
| blob5 | coarse viewport class: `mobile`, `tablet`, `desktop`, or empty |
| double1 | `1` (row count) |

`timestamp` is added automatically by the platform.

## How to query

Workers Analytics Engine is queried through the SQL API:

```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql
Authorization: Bearer <Analytics API token with Account Analytics Read>
```

Example request with no credentials:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql" \
  --header "Authorization: Bearer <ANALYTICS_API_TOKEN>" \
  --data "SELECT SUM(_sample_interval) AS n FROM benkai_assistant_events WHERE blob1 = 'chat_open'"
```

Sampling is accounted for with `_sample_interval` (see the Workers Analytics Engine SQL
reference). Queries below follow that convention.

### 1. Total Assistant opens

```sql
SELECT SUM(_sample_interval) AS opens
FROM benkai_assistant_events
WHERE blob1 = 'chat_open'
```

### 2. Estimated unique anonymous sessions

```sql
SELECT COUNT() FROM (
  SELECT index1 AS session_id
  FROM benkai_assistant_events
  GROUP BY index1
)
```

The number of returned rows estimates anonymous unique sessions.

### 3. Local answers vs Gemini answers

```sql
SELECT blob2 AS source, SUM(_sample_interval) AS answers
FROM benkai_assistant_events
WHERE blob1 IN ('chat_local_answer', 'chat_gemini_answer')
GROUP BY blob2
```

### 4. Gemini requests per day

```sql
SELECT intDiv(toUInt32(timestamp), 86400) * 86400 AS day, SUM(_sample_interval) AS requests
FROM benkai_assistant_events
WHERE blob1 = 'chat_gemini_request'
GROUP BY day
ORDER BY day
```

### 5. Quota-limit count

```sql
SELECT SUM(_sample_interval) AS quota_events
FROM benkai_assistant_events
WHERE blob1 = 'chat_quota_limit'
```

### 6. Chat-to-contact clicks

```sql
SELECT SUM(_sample_interval) AS contact_clicks
FROM benkai_assistant_events
WHERE blob1 = 'chat_contact_click'
```

### 7. Top known project starter/local interactions

```sql
SELECT blob3 AS project_slug, SUM(_sample_interval) AS interactions
FROM benkai_assistant_events
WHERE blob1 = 'chat_local_answer' AND blob3 != ''
GROUP BY project_slug
ORDER BY interactions DESC
LIMIT 10
```

## Operational notes

- Analytics writes are best-effort and never block or alter the Assistant response.
- The per-session Gemini budget (`MAX_GEMINI_TURNS_PER_SESSION = 4`) is a browser-only
  quota-conservation control, not a security or global rate limit. It is distinct from Google
  free-tier quota handling.
- Event names and payload fields are strictly allowlisted; arbitrary fields are rejected.
- Add the dataset to the Worker binding in `wrangler.jsonc` and regenerate types with
  `npx wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts` after any binding change.