import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Mail,
  Newspaper,
  Palette,
  Settings2,
} from "lucide-react";

const cards = [
  {
    href: "/cms/index.html",
    icon: Newspaper,
    title: "Блог статии",
    desc: "Писане, редакция и изтриване на статии — на двата езика, със снимки и категории.",
    external: false,
  },
  {
    href: "/cms/index.html#/collections/settings",
    icon: Settings2,
    title: "Настройки на сайта",
    desc: "Контакти (имейл, телефон, адрес), текстовете на началния екран, числата и ЧЗВ.",
    external: false,
  },
  {
    href: "/bg/design-system",
    icon: Palette,
    title: "Дизайн система",
    desc: "Токените на сайта: цветове, типография, спейсинг, грид и движение — документирани.",
    external: false,
  },
  {
    href: "https://vercel.com/dashboard",
    icon: BarChart3,
    title: "Статистика и хостинг",
    desc: "Посещения, производителност и деплойменти — във Vercel таблото на сайта.",
    external: true,
  },
  {
    href: "https://resend.com/emails",
    icon: Mail,
    title: "Запитвания от формата",
    desc: "Формата праща директно на uniagent@unitrans.bg. Логът на изпращанията е в Resend.",
    external: true,
  },
  {
    href: "/admin/guide",
    icon: BookOpen,
    title: "Наръчник",
    desc: "Кратки инструкции: как се пише статия, как се сменят контактите, как се публикува.",
    external: false,
  },
];

export default function AdminHub() {
  return (
    <main className="min-h-screen bg-mist/60">
      <header className="border-b border-line bg-paper">
        <div className="container-x flex h-[4.5rem] items-center justify-between">
          <span className="flex items-center gap-3">
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="h-[7px] w-[7px] bg-green" />
              <span className="h-[7px] w-[7px] bg-plum" />
            </span>
            <span className="font-display text-[0.9375rem] font-bold tracking-[-0.01em]">
              UNITRANS <span className="font-normal text-steel">&</span> UNIAGENT
            </span>
          </span>
          <a href="/bg" className="link-slide micro text-slate">
            Към сайта →
          </a>
        </div>
      </header>

      <div className="container-x py-16 sm:py-24">
        <p className="micro text-steel">Админ панел</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          Управление на сайта.
        </h1>
        <p className="text-lede mt-5 max-w-2xl text-slate">
          Всичко на едно място: съдържание, статии, дизайн система и статистика.
          Промените се публикуват автоматично след запис.
        </p>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              <c.icon
                className="h-6 w-6 text-navy transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.8}
              />
              <h2 className="font-display mt-6 text-h4">{c.title}</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-slate transition-colors duration-300 group-hover:text-white/70">
                {c.desc}
              </p>
              <ArrowUpRight
                className="absolute right-6 top-6 h-4 w-4 text-steel opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white"
                strokeWidth={2}
              />
            </a>
          ))}
        </div>

        <div className="mt-10 border border-line bg-paper p-6">
          <p className="micro text-steel">Режим на работа</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
            <strong className="text-ink">Локално (разработка):</strong> стартирайте{" "}
            <code className="bg-mist px-1.5 py-0.5 text-[0.8125rem]">npm run cms</code> в
            отделен терминал и отворете „Блог статии“ — редакциите се записват директно
            във файловете. <strong className="text-ink">Продукция:</strong> редакциите
            стават през GitHub и Vercel публикува автоматично след ~1 минута (вижте
            наръчника за еднократната настройка).
          </p>
        </div>
      </div>
    </main>
  );
}
