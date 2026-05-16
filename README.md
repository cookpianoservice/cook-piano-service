# Cook Piano Service Website

Static first draft for modernizing [cookpianoservice.com](https://www.cookpianoservice.com/) from Wix to a GitHub plus Cloudflare Pages workflow.

## What is included

- Mobile-friendly one-page marketing site
- Owner-provided piano and logo imagery prepared for web use
- Schedule/contact form that opens an email draft
- Google Analytics placeholder script
- No build step or paid hosting requirement

## Local preview

Open `index.html` directly in a browser, or run a small static server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Google Analytics

Replace every instance of `G-XXXXXXXXXX` in `index.html` with the live GA4 measurement ID.

## Cloudflare Pages

Suggested setup after the GitHub repo is published:

1. In Cloudflare, create a new Pages project.
2. Connect the GitHub repository.
3. Set the framework preset to `None`.
4. Leave the build command blank.
5. Set the output directory to `/`.
6. Deploy, then add `cookpianoservice.com` and `www.cookpianoservice.com` as custom domains.

When ready to cut over DNS, move authoritative DNS to Cloudflare and point the root and `www` records at Cloudflare Pages.
