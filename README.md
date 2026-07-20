# Unitrans & Uniagent — уебсайт v2

Двуезична (BG/EN) визитка с контактна форма за Unitrans Ltd. & Uniagent Varna Ltd.
Изграден по [BRIEF.md](./BRIEF.md) — одит, проучване и дизайн система са описани там.

## Стартиране

```bash
npm install
npm run dev        # http://localhost:3010
```

- `http://localhost:3010/bg` — български
- `http://localhost:3010/en` — английски
- `http://localhost:3010/bg/design-system` — дизайн системата (токени)

## Структура

```
src/
  app/[lang]/            начална страница + layout + design-system
    about|services|cargo|ports|contact/   тематични подстраници
    blog/ + blog/[slug]/                  блог индекс и статии
  app/api/contact/       форма → имейл (Resend)
  components/sections/   Hero, About, Services, Process, Operations,
                         Cargo, PortsMap, Clients, Faq, Contact
  components/pages/      TimelineSlider, CommodityExplorer
  components/ui/         Button, SectionHead, Counter, PageHero, CtaBand
  content/               bg.ts / en.ts + pages-bg.ts / pages-en.ts + posts.ts
  lib/map-data.ts        dot-matrix карта на България (генерирана)
public/images|logos|fonts  оптимизирани ассети
```

Кораби на живо: /ports вгражда AIS картата на VesselFinder (безплатен embed).
За къстъм карта в дизайна на сайта: aisstream.io (безплатен WebSocket AIS API) + MapLibre.

## Админ панел

- **/admin** — хъб: съдържание, дизайн система, статистика, наръчник
- **/cms/index.html** — Decap CMS: блог статии (CRUD, BG+EN) + настройки
  (контакти, hero, числа, ЧЗВ). Съдържанието живее в `content/` като JSON.
- **Локално:** `npm run cms` в отделен терминал (decap-server) → редакциите
  се записват директно във файловете, без акаунти.
- **Продукция:** GitHub OAuth (виж /admin/guide, стъпка 04): попълни `repo:` и
  `base_url:` в `public/cms/config.yml`, създай GitHub OAuth App и добави
  `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` във Vercel.
  Publish в CMS-а прави commit → Vercel публикува автоматично.

## Контактна форма

Без `RESEND_API_KEY` формата работи в демо режим (връща успех, логва в конзолата).
За продукция: задайте в `.env.local` / Vercel:

```
RESEND_API_KEY=re_xxx
CONTACT_TO=uniagent@unitrans.bg
RESEND_FROM="Unitrans Website <no-reply@unitrans.bg>"   # верифициран домейн в Resend
```

## Деплой (Vercel, 0 лв./месец)

1. Push към GitHub → Import във Vercel (настройки по подразбиране).
2. Добавете env променливите по-горе.
3. Свържете домейна unitrans.bg (`NEXT_PUBLIC_SITE_URL=https://unitrans.bg`).

SEO/GEO: hreflang BG/EN, Schema.org (Organization + FAQPage), sitemap.xml, robots.txt, llms.txt.

## Стек

Next.js 15 · React 19 · Tailwind CSS v4 (токени в `globals.css`) · Framer Motion · Embla · Lucide
