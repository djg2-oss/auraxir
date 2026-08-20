# Auraxir

Elite websites & premium apps. You build on Auraxir.

The OS is **ANMOS** — Auraxir Native Model Operating System. Dual-brain intelligence is **G2P Agent Black**.

- Look: local G2P corpus (brain D, zero vendor latency)
- Copy: grok-4.6 only when the brief needs language (brain R)
- Floor: kernel writer if the vendor is dark or slow
- Schedule: series / parallel / backup — decided on the input

- Domain: https://auraxir.com
- Stack: TanStack Start, React 19, Vite 8, Tailwind v4, Nitro
- Primary host: Vercel. Standby: Railway (`NITRO_PRESET=node-server`)

## Develop

```bash
npm install
npm run dev
```

Optional: `XAI_API_KEY` for ANMOS copy. Without it, kernel copy still ships.

## Deploy

**Vercel (primary)** — import this repo, `npm run build`.

**Railway (standby)** — Dockerfile + `railway.toml`, health `GET /api/health`.
