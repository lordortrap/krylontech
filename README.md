# Vitalii Pietukhov — AI No-Code Developer portfolio

Single-page Next.js 14 site (dark neon HUD style). Content lives in `app/data.ts`.

## Run
    npm install
    npm run dev

## Build
    npm run build

## Contact form
Without configuration the form opens the visitor's mail app (mailto fallback).
To send directly, create a Formspree form and set in `.env.local` / Vercel:

    NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_id

## Adding project screenshots
Put an image in `public/images/projects/` and set `image` for the project in `app/data.ts`.
