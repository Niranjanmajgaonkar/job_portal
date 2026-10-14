# Marathi-first frontend design notes

The current phase builds a useful Next.js homepage for Maharashtra job seekers. Backend integration follows later. The research informs the design; the applicant's ability to find, understand, and save a suitable opportunity determines the final layout.

## Research reviewed

All five local references informed this direction:

- `competitor_research_report.docx`: competitor context, mobile performance, Marathi content, discovery, saves, and alerts.
- `laravel_vs_nextjs_marathi.docx`: rendered HTML, job routes, metadata, internal links, caching, and a future API boundary.
- `Architecting Dominance_ A Blueprint for the Optimal Marathi Government Job Portal Page (1).pdf`: an immediate Marathi summary, readable details, official sources, and practical application guidance.
- `महाराष्ट्रातील सरकारी नोकऱ्यांचा खरा अर्थ_ मराठी-प्रथम वेबसाइट रणनीतीचा विजयाचा मार्ग.pdf`: reduce applicant effort, support Marathi and familiar English search terms, explain eligibility, and improve Devanagari readability.
- `Color Combination.pdf`: Trust Blue, restrained saffron accents, light backgrounds, visual hierarchy, and accessible mobile interactions.

The reports contain useful product ideas alongside broad competitor claims and dated technical examples. Traffic estimates, technology comparisons, competitor weaknesses, and claimed ranking or indexing improvements are research assertions rather than verified implementation guarantees.

## Homepage direction

- Lead with clear Marathi language and a prominent recruitment search.
- Make education, district, and department useful ways to discover opportunities.
- Surface latest recruitment and approaching deadlines without making applicants open every listing.
- The homepage quick-category grid leads with what users need most (all advertisements, results, admit cards, current affairs, mega recruitment, education/district/profession browsing, age calculator, previous papers, schemes, closing dates), and a "नवीन शोधा — अधिक वर्ग" button reveals additional utility options (exam calendar, document checklist, application guide, safe-application advice, alert preferences, saved jobs) below the primary set. Placeholder tools (current affairs, mega bharti, age calculator, question papers, schemes) show an honest sample-content toast until real sections exist.
- Show the information needed for an initial decision: organization, vacancies, eligibility, location, and an absolute deadline.
- Keep saved opportunities easy to revisit and distinguish recruitment from results and admit-card updates.
- Use readable web content and clear detail links; an official PDF can remain a source reference rather than the only reading experience.
- Carry the research's three-level structure into detail pages: Marathi overview, full information, and practical next steps.
- Prefer real source attribution and straightforward application guidance over decorative claims of authority.

The visual identity is “नोकरी महाराष्ट्र”. It is an independent portal preview and must not imply government ownership or endorsement.

## Color and readability

- Primary brand and key actions: blue `#0D47A1`.
- Restrained highlights and accents: saffron `#FB8C00`.
- Reading surfaces: white and soft neutral backgrounds, with dark body text and clear separators.
- Use darker text on saffron and pale warning backgrounds; the source's white-on-orange and light warning-text suggestions are not safe defaults for small text.
- Keep status labels and icons alongside color so urgency, selection, and saved state remain understandable without color perception.
- Use local Unicode Devanagari fonts, comfortable line heights, visible keyboard focus, descriptive labels, and generous touch targets.
- Preserve a clear hierarchy as the desktop layout stacks onto small screens, and respect reduced-motion preferences.

## Current frontend boundary

The implementation uses Next.js 16 with the App Router, TypeScript, and prerendered initial content. Browser interactions enhance the rendered page. Current setup follows the [official Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation); older Pages Router examples in the reports are not the implementation contract.

Jobs, vacancy totals, deadlines, and update examples are mock content for design review. They must remain visibly identified as examples and excluded from indexing. Metadata currently requests `noindex, nofollow`; the preview must not publish mock `JobPosting` structured data.

Search and filters operate on the local sample dataset. Saved-job identifiers and preferences use `localStorage` on this browser. They do not create accounts, synchronize across devices, submit applications, or send email, push, Telegram, or WhatsApp alerts. Preference confirmation means settings were stored locally.

## Future backend handoff

Replace the local dataset with a documented API when backend work starts. Keep stable job identifiers and slugs, typed fields, and a clear separation between data access and presentation.

The future content workflow needs official notice and application URLs, reviewed Marathi summaries, eligibility, locations, publication and update timestamps, deadlines, vacancy counts, and correction/expiry handling. A Laravel API and editorial admin are options described in the research, not dependencies of this frontend phase.

Real accounts, synchronized saves, subscribed notifications, delivery consent, and unsubscribe controls belong to that later integration. Choose caching and revalidation according to actual publishing frequency and freshness requirements.

## Search visibility before production

Ranking depends on useful original content, accurate official sources, site credibility, crawlable pages, and measured performance. Next.js and a polished interface do not guarantee first place or rich-result eligibility. Follow Google's [helpful, reliable, people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

Before indexing production:

1. Replace all mock recruitment and numerical claims with real, verified, current job information and official application paths.
2. Configure the actual production domain for metadata, canonical URLs, and sitemap entries; do not invent a domain for the preview.
3. Publish appropriate privacy, contact, independence, and editorial/source information.
4. Review metadata, crawlability, related links, missing-page behavior, and expiry handling before removing preview `noindex`.
5. Add validated `JobPosting` data only to eligible individual job pages, matching their visible content; never to the homepage or a results list. Follow [Google's job-posting requirements](https://developers.google.com/search/docs/appearance/structured-data/job-posting).
6. Measure mobile loading, responsiveness, and layout stability with production content and real devices. Performance targets require measurement rather than framework assumptions.

Production sitemap submission, Search Console verification, and indexing requests require that real domain and verified content first. Rich results remain Google's decision even when structured data is valid.
