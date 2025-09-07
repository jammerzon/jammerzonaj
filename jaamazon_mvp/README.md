# Jaamazon — MVP (static, free)

A zero-cost, static MVP for an Animal Jam trading board. Host on **Cloudflare Pages**, **Netlify**, or **GitHub Pages**. Data can come from a public **Google Sheet** for free.

> Disclaimer: Unofficial fan site. Not affiliated with WildWorks or Animal Jam. Do not enable real-money trading and follow the game's Terms of Service.

## Quick Start (no code tools)
1. Create a GitHub repo and upload these files.
2. Turn on GitHub Pages (main branch, root) or connect the repo to Cloudflare Pages/Netlify.
3. Visit your site at `yourname.github.io/jaamazon` or `*.pages.dev`.

## Switch to Google Sheets as your backend (free)
1. Make a Google Sheet with columns: `title, category, rarity, priceType, price, wants, notes, image, user, contact, postedAt`.
2. File → Share → Anyone with the link (Viewer).
3. Use **opensheet** to get JSON for free: `https://opensheet.elk.sh/<SHEET_ID>/<SHEET_NAME>`
   - Example: `https://opensheet.elk.sh/1AbC...xyz/Listings`
4. Open `app.js` and set:
   ```js
   const DATA_URL = 'https://opensheet.elk.sh/<SHEET_ID>/<SHEET_NAME>';
   const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/<your-form-id>/viewform';
   ```
5. Make a matching **Google Form** and set its destination to your Sheet, so new submissions auto-appear.
6. In your Sheet, use an extra worksheet that mirrors/cleans the form responses into the exact columns the app expects. Publish that worksheet via opensheet and point `DATA_URL` at it.

## Custom domain (free-ish)
- Totally free: use the host subdomain: `jaamazon.pages.dev` or `jaamazon.netlify.app`. These can rank on search.
- If you later buy a domain (like `jaamazon.gg`), connect it in Cloudflare/Netlify DNS.

## SEO basics
- Keep the name in the `<title>` and add a clear `<meta name="description">`.
- Add a simple `sitemap.xml` and `robots.txt` once deployed.
- Link to your site from your Discord, Reddit posts, and fan wikis to get indexed.

## Next steps (still free tiers)
- Moderation: add a Google Form question that requires a Discord handle; moderate via the Sheet.
- Images: ask users to paste **Imgur** links (free) into the form.
- Analytics: add simple privacy-friendly analytics like Cloudflare Web Analytics (free).

## Roadmap
- User accounts (Supabase free tier) and in-browser listing creation.
- Real-time chat on each listing (e.g., Supabase Realtime) or Discord bot bridge.
- Tagging, saved searches, and notifications.

---

Build fast, stay safe, keep it free.
