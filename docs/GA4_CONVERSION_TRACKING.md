# BenKai Systems — GA4 conversion-event contract

**Status:** Draft implementation; not merged, built, deployed or verified in GA4.
**Scope:** BenKai public website only. Existing GA4 tracking ID: `G-QFVSKC0BD3` (loaded by GA4 PR #1 / deployed site, not duplicated in this change).

## Events

| Event | When sent | Parameters (non-identifying) | Business meaning |
| --- | --- | --- | --- |
| `generate_lead` | Web3Forms POST returns successful HTTP response **and** `success: true` | `lead_source: contact_form`, `service_category` (fixed form choice) | Successful enquiry acceptance, not a paid client or qualified opportunity |
| `contact_click` | Explicit click on `mailto:`, `tel:`, or WhatsApp contact link | `contact_method: email/phone/whatsapp`, `click_location: footer/page` | Contact intent only; not proof that a call or message occurred |
| `project_demo_click` | Click on a specifically marked project demo/live-pilot link | `project_slug` (static slug) | Project/demo interest only; not proof a demo was used |

**No name, email, phone number, contact-form text, visitor identifier, WhatsApp number, message content, or external full URL is sent as GA4 event parameters.** The existing form submission to Web3Forms is unchanged.

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

1. Preserve outstanding GA4 PR #1 and all other release PRs; integrate this branch only after reviewing any conflicts with the canonical release baseline.
2. Run clean install, both npm audits, lint, TypeScript checks, static build, protected Worker packaging, and the existing full browser/HTTP smoke suite. Do not bypass the RSC prefetch gate.
3. On a safe preview, stub the analytics function to verify: accepted response creates one `generate_lead`; validation failure, provider error and double-click do not; both contact links and marked demo links emit only their respective custom events.
4. In a *controlled production acceptance window*, confirm GA4 Realtime/DebugView receives events with matching parameter values. Avoid submitting fake enquiries to the real provider; use a safe mocked provider in local tests, or an explicitly approved test enquiry.
5. In **GA4 Admin → Data display → Events/Key events**, mark `generate_lead` as a key event once the first valid event appears, or configure that event by name using the supported admin interface. Do not mark contact clicks/demo clicks as equivalent to confirmed leads.
6. Verify only one `page_view` per intended navigation independently; this PR does not change page-view tracking.
7. Record validated deployment commit, event evidence, date and rollback notes in governance and Linear.

## UTM conventions

For campaigns shared on LinkedIn, WhatsApp Status, TikTok or Instagram, use consistent query parameters on links to `https://benkaisystems.co.ke`:

- `utm_source`: `linkedin`, `whatsapp`, `tiktok`, `instagram`
- `utm_medium`: `social` or `organic_social` (pick one company standard)
- `utm_campaign`: stable lowercase short campaign identifier, e.g. `workflow-handover-2026-11`

Do not put names, phone numbers or sensitive information in UTM values. Standard GA4 campaign attribution is used; no second tag or manual `page_view` event is added.

## Focused source-behavior validation — 2026-11-24

Validation performed against exact GitHub branch file content using isolated JavaScript harnesses that strip TypeScript-only annotations and stub network/DOM calls. These are **focused logic checks, not Next.js integration tests**.

- **GA4 event helper (3/3 passed):** configured tag receives one non-PII custom event; missing tag is harmless; tag throwing an error does not interrupt the business action.
- **Click listener (7/7 passed):** footer phone, page email, WhatsApp, marked project demo, unmarked external link, invalid project slug and non-anchor targets.
- **Contact form accepted-response code (3/3 passed):** one lead event for HTTP success plus `success: true`; none for provider rejection or HTTP failure.

Observed two source-review issues and corrected them on this draft branch: defensive tracking exception isolation, and excluding ordinary external website links from the project-demo metric.

**Not validated:** full React hydration, browser interactions on integrated release, exact lockfile dependency audit for this branch, lint/TypeScript/static business build, complete Workers smoke suite, duplicate GA4 collection during navigation, Web3Forms production acceptance, or GA4 Realtime receipt of the three new custom events. Do not interpret these 13 checks as full release acceptance.
