# Make-an-appointment landing page

The standalone paid-search page is `make-an-appointment.html`, served at
`/ppc/make-an-appointment` through the 200 rule in `_redirects`. The browser URL
and its gclid/UTM parameters remain intact. It is marked `noindex, follow`, is
not added to the organic sitemap, and is allowed by the existing robots.txt.

## Content and assets

- All 11 sections from the supplied brief are included, with 15 phone links and
  unique `data-cta-location` values. There are no forms, booking widgets, site
  navigation, or links from the logo.
- The four reviews are verbatim from the supplied brief. No aggregate rating,
  review count, extra offers, or after-hours voicemail claims were added.
- Dentist and FAQPage JSON-LD are in the HTML. FAQ answers match the visible copy.
- Patient, reception, waiting-room, and treatment-room images came from the
  client's supplied Drive folder. Doctor portraits and the logo came from this
  repository. Responsive AVIF/WebP derivatives are self-hosted in `assets/ppc`.
- DM Serif Display and Outfit are self-hosted; their OFL licenses are included.
- The map iframe loads only when its disclosure is opened. Every call link
  remains usable without JavaScript. The hours indicator uses Indianapolis time
  and is hidden outside Monday–Thursday, 8am–5pm.

## Tracking

The page reuses `GTM-P3KCJKKZ`. Its published container was inspected on
2026-10-14 and already contains:

| Setting                         | Verified value         |
| ------------------------------- | ---------------------- |
| Google Analytics measurement ID | `G-3KDTMTF37R`         |
| Google Ads ID                   | `AW-18158652870`       |
| Website-call conversion label   | `Fk0SCJWpxJsdEMab3NJD` |
| Number to replace               | `(574) 234-4117`       |

The Google tag and phone-forwarding configuration stay in GTM, avoiding a
second installation of the same configuration directly in the page.

Each phone link pushes the existing `phone_call_click` GTM event with
`phone_number` and `cta_location`, and sends a GA4 `phone_click` event with its
placement. The current GTM GA4 event tag maps `phone_number`; the separate
`phone_click` event supplies placement reporting without changing the container.
Phone navigation is never delayed or prevented for analytics.

No separate Google Ads click-conversion label was found in the published
container. If the ads manager wants this additional conversion, set
`clickConversionDestination` in `assets/ppc/landing.js` to its confirmed
`AW-18158652870/LABEL` value. Do not reuse the completed-call label for clicks.

On localhost, the remote GTM script is disabled so preview visits and test clicks
do not enter the production analytics account. Events can still be inspected
in `window.dataLayer`.

## Before launching ads

1. Supply the actual privacy-policy URL and add its footer link. No privacy link
   was found on the homepage or in the repository. `/privacy-policy` returns the
   homepage rather than a policy, so a broken or misleading link was not added.
2. Confirm whether a distinct Google Ads click conversion is wanted and supply
   its label if so. Existing website-call forwarding configuration is reused.
3. After publication is approved, use Tag Assistant on the deployed URL and
   `#google-wcc-debug` to verify forwarding-number replacement and receipt of
   the call events. These live conversion checks cannot be established by a
   localhost preview. Also confirm the new route with real gclid/UTM parameters.
4. Run Google's Rich Results Test against the published URL. JSON parsing and
   exact FAQ/content matching have passed locally; Google's hosted test has not
   been run against a deployed landing page.

## Local review and validation

No build or dependency installation is needed for the website. From the
repository root, run `python3 -m http.server 4173` and visit
`http://localhost:4173/ppc/make-an-appointment.html`. A static host that supports
`_redirects` serves the extensionless production URL.

Checks performed on 2026-10-14:

- Chromium and WebKit at 360, 375, 414, 1280, and 1440px: no horizontal overflow
  or page script errors. This is browser-engine testing, not physical-device QA.
- At 375×667, the hero call button ends near 501px and is visible without
  scrolling. The mobile sticky bar appears after the hero call button scrolls
  away. Desktop keeps the header call control visible.
- Accessible review/FAQ disclosures, click-to-load map, JavaScript-disabled call
  links, and Indianapolis business hours (including a closed Friday) checked.
- All four reviews match the brief, all eight FAQ answers match JSON-LD, and
  all 15 phone links queue an event with a distinct placement.
- Local Lighthouse mobile: Performance 99, Accessibility 100, Best Practices
  100; LCP 2.2 seconds, CLS 0, TBT 30ms, initial transfer 246 KiB.
- Scores describe the local preview with remote marketing tags disabled. Run a
  production audit after approval to include hosting and Google's live scripts.
  Field INP and actual Google Ads conversion attribution require real visits.

This page is committed for review only. Publishing requires the user's approval.
