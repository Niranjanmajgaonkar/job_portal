# j_portal_practice

## नोकरी महाराष्ट्र — Next.js frontend

A Marathi-first job portal homepage built from the research documents in this repository. This phase uses fictional recruitment data only. No Laravel, database, authentication, API, or notification delivery is implemented.

### Run locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` followed by `npm start`.

### Included

- Responsive Marathi homepage, department navigation, practical application guides, and mobile navigation.
- Marathi, English, and mixed keyword search; education/district/department filters; deadline sorting and load more.
- Saved jobs and preferences stored in this browser with `localStorage`.
- Eight sample recruitment detail pages and a Marathi 404 page.
- Local Devanagari fonts, keyboard navigation, accessible dialogs, and reduced-motion support.
- Preview `noindex` metadata and clear sample-content disclosures. No fictional job structured data is published.

Results, admit cards, and exam-calendar panels currently explain that no records have been added and link to official department websites.

### Main files

- `components/home-page.tsx`: homepage and browser interactions.
- `app/globals.css`: visual design and responsive styles.
- `lib/jobs.ts`: typed fictional jobs, district names, and formatting.
- `app/bharti/[slug]/page.tsx`: recruitment detail pages.
- `docs/frontend-design-notes.md`: research decisions and future integration notes.

### Validation

```bash
npm run typecheck
npm run build
```

The existing HTML references, PDFs, and Word reports are retained unchanged.
