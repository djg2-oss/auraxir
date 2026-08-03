# Auraxir

Elite websites & premium apps. You build on Auraxir.

- Domain: https://auraxir.com
- Stack: TanStack Start, React 19, Vite 8, Tailwind v4, Nitro (Vercel)

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Import this repo in Vercel
2. Framework: Vite / Nitro (uses `npm run build`)
3. Add domain `auraxir.com` in Vercel
4. Point Cloudflare DNS to Vercel (CNAME/A as Vercel shows)
5. SSL: Cloudflare Full (strict)

## Scripts

- `npm run dev` — 0.0.0.0:8080
- `npm run build` — Vercel output
- `npm run typecheck`
