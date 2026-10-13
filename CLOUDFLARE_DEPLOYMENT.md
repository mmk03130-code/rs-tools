# Cloudflare Pages Deployment Guide for RS Tools

This application is 100% client-side (HTML5 Canvas 2D, WebAssembly, typed memory buffers, SubtleCrypto), making **Cloudflare Pages** the premier hosting platform:
- **Global Edge Network**: Cached across 300+ edge data centers worldwide.
- **Zero Cloud Costs**: 100% free with unlimited bandwidth and zero server bills.
- **Sub-Millisecond Response**: Pre-rendered static assets served directly from Cloudflare Anycast CDN.

---

## Pre-Configured Files in This Repository

1. **`wrangler.toml`**: Cloudflare Pages / Workers configuration pointing to `dist` output.
2. **`public/_headers`**: Cloudflare Pages edge response headers (immutable 1-year caching for `/assets/*`, security headers, and MIME types).
3. **`public/_redirects`**: Explicit 200 rewrites for all 52 client-side tool routes and 404 fallback.
4. **`package.json`**: Pre-configured build script `"deploy:cloudflare": "npx wrangler pages deploy dist"`.

---

## Option 1: Direct CLI Deployment (Wrangler)

If you have Node.js and npm installed:

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=rs-utility-tools
```

Or run the npm script:
```bash
npm run deploy:cloudflare
```

You will be prompted to authenticate your Cloudflare account in the browser on your first run. Once authorized, Wrangler deploys the application and outputs your live preview and production `*.pages.dev` URLs.

---

## Option 2: Continuous Git Deployment (Cloudflare Dashboard)

1. **Push your code to GitHub or GitLab**:
   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages deployment"
   git push origin main
   ```

2. **Open Cloudflare Dashboard**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/).
   - Navigate to **Workers & Pages** > **Create application** > **Pages** tab.
   - Click **Connect to Git** and authorize your GitHub/GitLab repository.

3. **Configure Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave default)

4. **Click "Save and Deploy"**:
   Cloudflare automatically runs the build pipeline and provides a live `https://rs-utility-tools.pages.dev` URL with automated HTTPS and SSL certificates. Every subsequent Git push will trigger automatic preview and production deployments.

---

## Custom Domain Setup

1. In the Cloudflare Pages dashboard for your project, select the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g. `tools.yourdomain.com` or `yourdomain.com`).
4. If your domain's DNS is managed on Cloudflare, Cloudflare automatically adds the CNAME DNS record.
5. SSL/TLS certificates are issued automatically and renewed for free.

---

## Troubleshooting: "Unknown lockfile version" (Bun 1.2.15 vs bun.lock v2)

If your Cloudflare build failed with:
```
Installing project dependencies: bun install --frozen-lockfile
bun install v1.2.15 (df017990)
2 |   "lockfileVersion": 2,
                         ^
error: Unknown lockfile version
```

### Why this happens:
Cloudflare Pages' default build container comes with **Bun v1.2.15**, which does not recognize `bun.lock` with `"lockfileVersion": 2`.

### The Solution (Already prepared in this repo):
1. **Use standard `package-lock.json`** (Recommended):
   - We removed `bun.lock` and generated a clean `package-lock.json`.
   - Cloudflare Pages will detect `package-lock.json` and automatically run `npm ci` with `nodejs@20.20.0`, which compiles the Vite bundle cleanly in ~17 seconds.
   - Simply commit and push this update to your GitHub repo (`git add . && git commit -m "fix: use package-lock.json for Cloudflare Pages build" && git push`).

2. **Alternative: Set `BUN_VERSION` in Cloudflare Pages Dashboard**:
   - In Cloudflare Dashboard > **Workers & Pages** > Select your project > **Settings** > **Environment variables**.
   - Add variable: `BUN_VERSION` = `1.2.18` (or newer).
   - Re-trigger the deployment.

---

## Verified Build Output
- Build tool: `vite build`
- Output directory: `dist`
- Assets: `/assets/*.js`, `/assets/*.css` with content hashes for immutable edge caching.

