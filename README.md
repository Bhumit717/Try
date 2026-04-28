# Export Buyer Lead Generation SaaS

Production-oriented Next.js + Node scraping stack for generating global buyer leads from public/free sources only.

## Features
- AI query rotation with daily keyword variation
- Search scraping with deep pagination (up to 20 pages/query)
- Internal-page crawl for email/contact mining
- AI-like rule classifier for importer/wholesaler/distributor filtering
- Duplicate and resurfaced lead detection
- Daily automation via cron (`scripts/runDailyScrape.ts`)
- Supabase CRM with lead API + mobile-first dashboard
- SMTP outreach endpoint for one-click/bulk email

## Setup
1. `npm install`
2. Configure `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
3. Apply SQL in `migrations/001_init.sql`.
4. `npm run dev`
5. Daily bot: `npm run scrape:daily` via cron (e.g., `0 3 * * *`).
