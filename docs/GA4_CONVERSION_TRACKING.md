# BenKai Systems — GA4 conversion-event contract

**Production baseline (2026-11-26):** PRs #1–8 are merged; `eaee29ea2502c7eb602693f400993798c862792e` is the last validated production commit. The baseline already includes the single GA4 tag and the delegated custom-event instrumentation. PR #9 adds the social links, not a second tag, and awaits owner release approval. See `BUSINESS_RELEASE_ROLLBACK.md` for the Worker version and release sequence.

**Property:** `559113517`, web stream `16132429354`, measurement ID `G-QFVSKC0BD3`, Africa/Nairobi, KES. Previously verified: historical reporting and Realtime visitors. Owner-provided stream settings: Enhanced Measurement and outbound clicks enabled. Live event-by-event acceptance, `generate_lead` key-event registration, and the five custom definitions below are pending.

## Events

| Event | When sent | Parameters (non-identifying) | Business meaning |
| --- | --- | --- | --- |
| `page_view` | Initial load or intended client-side route change | Standard GA4 page dimensions | Website page viewed |
| `first_visit` | GA4 identifies a new browser visitor | Standard GA4 dimensions | First visit for that browser |
| `session_start` | GA4 starts a session | Standard GA4 dimensions | Browsing session started |
| `generate_lead` | Web3Forms POST returns successful HTTP response **and** `success: true` | `lead_source: contact_form`, `service_category` (fixed form choice) | Successful enquiry acceptance, not a paid client or qualified opportunity |
| `contact_click` | Explicit click on `mailto:`, `tel:`, or WhatsApp contact link | `contact_method: email/phone/whatsapp`, `click_location: footer/page` | Contact intent only; not proof that a call or message occurred |
| `project_demo_click` | Click on a specifically marked project demo/live-pilot link | `project_slug` (static slug) | Project/demo interest only; not proof a demo was used |
| `click` | Eligible outbound link under Enhanced Measurement | Standard GA4 outbound link dimensions | Outbound interaction, not a lead |

**Custom event payloads** contain no name, email, phone number, contact-form text, visitor identifier, WhatsApp number, message content, or full external URL. GA4's automatic outbound event can carry the public destination URL; it is a separate metric. The form submission to Web3Forms is unchanged.

The event helper **does not install another GA4 tag**. If the configured `window.gtag` is absent or tracking is blocked, the event is skipped without affecting the form or link navigation.

### Footer and Contact page social links

Public destinations are maintained in `src/data/social.ts`. The footer and
Contact page use ordinary external links for WhatsApp and Instagram. The one
delegated tracker emits one `contact_click` per WhatsApp activation with
`contact_method: whatsapp` and `click_location: footer` or `page`, respectively.
Phone and email still use `tel:` and `mailto:`. None of these clicks counts as a
lead. Instagram does not emit a custom event; it is eligible for the stream's
existing Enhanced Measurement outbound `click` when enabled and the destination
is not excluded by cross-domain settings. The custom payload exclusions above
are distinct from GA4's automatic outbound link dimensions.

For preview checks, intercept the external destinations and stub `window.gtag`.
Verify exact custom payloads and that the links still open if tracking is absent
or throws. Do not send WhatsApp messages, real form submissions, or test GA4
traffic. Verify live collection only in an approved release window.

The focused check requires Python Playwright and Chrome. With the normalized
business build running locally, use:

```powershell
python scripts/social-contact.smoke.py http://127.0.0.1:8787
```

Local business preview validation against production baseline `eaee29e` plus
the social-link changes (November 26, 2026): Chrome passed at 320, 390, and
1440 px in light and dark themes. Contact RSC responses returned 200 and
navigation did not reload the document. The stub recorded exactly one custom
event for each WhatsApp click with the expected location and no custom event
for either Instagram link. The links still opened when `gtag` was absent or
threw. This confirms browser behavior, not receipt in the live GA4 property.

## Release and verification gates

1. Confirm the exact PR #9 head, fresh Codex review after any changes, and owner approval before merging or deploying. Run the established clean install, audits, lint, TypeScript, business build, Worker packaging dry run, HTTP and Chrome suites, including RSC prefetch.
2. In local preview, stub GA4 and Web3Forms. Verify one accepted response produces one `generate_lead`, including when the submit button is deliberately double-clicked. Invalid input, a rejection or an HTTP failure must produce none. Verify exact contact/demo payloads and navigation or submission with GA4 blocked or throwing. One local tag initialization is not proof of an automatic GA4 page view.
3. Only in an owner-approved acceptance window, open DebugView with a fresh Chrome profile and Tag Assistant. From `/`, navigate with site links to `/contact`, then `/projects`, and use browser Back. Verify one `page_view` for the initial load and each intended route transition, correct `page_location`/`page_referrer`, and no second initial event or event for a prefetch. Check `first_visit` and `session_start` for the new profile; they are not expected on every route. Confirm the stream's page-view browser-history setting and exclude duplicate tag sources before changing instrumentation if counts disagree.
4. In that window verify footer and page WhatsApp events individually, one `project_demo_click`, and one Instagram outbound `click` (check link domain and `outbound`; verify Instagram is not a cross-domain destination). Do not send a WhatsApp message. Real contact-form testing requires separate explicit approval and a clearly labeled internal enquiry. Verify accepted/rejected behavior locally regardless. Record event counts, parameters, UTC time, deployed Git SHA and Worker version here or in the release record and in the existing Linear issue when access is available. Do not attach payloads containing personal data.

## Property owner setup (pending)

- Select property `559113517` and verify web stream `16132429354` / `G-QFVSKC0BD3`. In **Admin → Data display → Events**, mark the existing `generate_lead` as a key event. If it has not appeared, use **Create event → Create with code → Mark as key event**, using the exact name; do not clone another event or add a second tag. Select **Once per event** so distinct accepted enquiries in one session each count. Preserve other key events. Do not create an Ads conversion as part of this release.
- In **Admin → Data display → Custom definitions → Create custom dimension**, select **Event** scope for each definition. Use the exact event parameter; allow 24–48 hours for reporting availability.

  | Display name | Event parameter | Used by |
  | --- | --- | --- |
  | Contact method | `contact_method` | `contact_click` |
  | Click location | `click_location` | `contact_click` |
  | Lead source | `lead_source` | `generate_lead` |
  | Service category | `service_category` | `generate_lead` |
  | Project slug | `project_slug` | `project_demo_click` |

- Check whether an internal-traffic rule or filter already exists. For an approved known test IP, use **Data streams → web stream → Configure tag settings → Show more → Define internal traffic** and **Admin → Data collection and modification → Data filters**. Use **Testing**, then verify matching events in an Exploration with **Test data filter name** before considering any activation. Do not activate permanent exclusions without owner approval. Annotate the test window and any approved test enquiry in reporting.

## UTM conventions

For campaigns shared on LinkedIn, WhatsApp Status, TikTok or Instagram, use consistent query parameters on links to `https://benkaisystems.co.ke`:

- `utm_source`: `linkedin`, `whatsapp`, `tiktok`, `instagram`
- `utm_medium`: `social` or `organic_social` (pick one company standard)
- `utm_campaign`: stable lowercase short campaign identifier, e.g. `workflow-handover-2026-11`

Keep the existing Instagram bio URL unchanged. Use optional UTMs on future campaign links only; do not put names, phone numbers or sensitive information in their values. Standard GA4 campaign attribution is used; no second tag or manual `page_view` event is added.

## Subsequent milestone: business reporting

1. Start with one GA4 Exploration or workbook. Report users and sessions, page views by path, product interest by project views and `project_demo_click`, session source/medium and campaign, engaged sessions and engagement rate, device category and coarse country/region. Keep `contact_click` by method/location separate from accepted `generate_lead` by service; never sum intent and enquiries into one lead count.
2. Compare the last complete week and calendar month with their previous equivalents in Africa/Nairobi. Label date ranges and ingestion lag, and query totals for each full period rather than adding daily distinct users. Exclude annotated QA traffic in analysis where it can be reliably isolated; do not alter collection for reporting convenience.
3. Use the existing OpenSEO Google Analytics connection, if accessible, for read-only organic and acquisition checks. Verify its available fields before relying on it for custom-event exports. Use the official GA4 Data API for repeatable extracts: query `properties/559113517` with `runReport` or `batchRunReports`, check metric/dimension compatibility, and use `customEvent:<parameter>` after definitions populate. Scope queries by event name, separate totals from breakdowns, and reconcile the first exports against GA4. Use only an authorized read-only credential outside Git.
4. Once reconciled, schedule extraction on existing approved automation, export dated aggregate CSV files and optionally an Excel workbook, and let the existing BenKai Marketing Agent read those artifacts in a later milestone. No new application, database, paid service or Agent change in this release.

## Historical focused source-behavior validation — 2026-11-24

Validation performed against exact GitHub branch file content using isolated JavaScript harnesses that strip TypeScript-only annotations and stub network/DOM calls. These are **focused logic checks, not Next.js integration tests**.

- **GA4 event helper (3/3 passed):** configured tag receives one non-PII custom event; missing tag is harmless; tag throwing an error does not interrupt the business action.
- **Click listener (7/7 passed):** footer phone, page email, WhatsApp, marked project demo, unmarked external link, invalid project slug and non-anchor targets.
- **Contact form accepted-response code (3/3 passed):** one lead event for HTTP success plus `success: true`; none for provider rejection or HTTP failure.

That historical branch added defensive tracking exception isolation and excluded ordinary external links from the project-demo metric. The checks below describe the limits of that run only, not the current release candidate.

**Not validated:** full React hydration, browser interactions on integrated release, exact lockfile dependency audit for this branch, lint/TypeScript/static business build, complete Workers smoke suite, duplicate GA4 collection during navigation, Web3Forms production acceptance, or GA4 Realtime receipt of the three new custom events. Do not interpret these 13 checks as full release acceptance.
