# Vitalii Pietukhov — AI No-Code Developer portfolio

Single-page Next.js 14 site (dark neon HUD style). Content lives in `app/data.ts`.

## Run
    npm install
    npm run dev

## Build
    npm run build

## Contact form
The form posts to `/api/contact`, which sends the message to your inbox through [Resend](https://resend.com).
Set these environment variables (Vercel > Settings > Environment Variables, or `.env.local` locally; see `.env.example`):

    RESEND_API_KEY=re_xxx
    RESEND_FROM=Portfolio <onboarding@resend.dev>   # optional
    CONTACT_TO=vitaliipietukhov@gmail.com           # optional

Without a verified domain Resend only delivers `onboarding@resend.dev` mail to the email of the Resend account owner.
To send to any address, verify a domain in Resend and set `RESEND_FROM` to an address on it.
If the key is missing or Resend fails, the form falls back to opening the visitor's mail app.

## Adding project screenshots
Put an image in `public/images/projects/` and set `image` for the project in `app/data.ts`.
