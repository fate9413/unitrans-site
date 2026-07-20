import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Наръчник — Админ панел",
  robots: { index: false },
};

function Step({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-line py-10">
      <div className="micro mb-4 flex items-baseline gap-4 text-slate">
        <span className="text-steel">{num}</span>
        <span className="h-px w-10 self-center bg-line" />
      </div>
      <h2 className="font-display text-h3">{title}</h2>
      <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-slate [&_code]:bg-mist [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.875rem] [&_code]:text-ink [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export default function AdminGuide() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="container-x flex h-[4.5rem] items-center justify-between">
          <a href="/admin" className="link-slide micro inline-flex items-center gap-2 text-slate">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
            Админ панел
          </a>
          <span className="micro text-steel">Наръчник</span>
        </div>
      </header>

      <div className="container-x max-w-4xl py-16 sm:py-24">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          Наръчник.
        </h1>
        <p className="text-lede mt-5 text-slate">
          Всичко, което е нужно за ежедневната работа със сайта — без техническа помощ.
        </p>

        <div className="mt-12 border-t border-line">
          <Step num="01" title="Как се пише статия">
            <p>
              Отворете <strong>Админ панел → Блог статии → New статия</strong>. Попълнете
              полетата на български и английски. Форматиране на текста:
            </p>
            <ul className="list-none space-y-2">
              <li><code>## Заглавие</code> — подзаглавие в статията</li>
              <li><code>- точка</code> — списък</li>
              <li><code>&gt; текст</code> — акцентиран цитат</li>
              <li>Празен ред разделя абзаците</li>
            </ul>
            <p>
              <strong>URL адрес</strong> се пише на латиница с тирета (напр.{" "}
              <code>grain-season-2027</code>) и не се променя след публикуване.
              <strong> Заглавната снимка</strong> се качва от бутона в полето — препоръчителен
              размер poне 1600px ширина. Накрая натиснете <strong>Publish</strong>.
            </p>
          </Step>

          <Step num="02" title="Как се сменят контактите и текстовете">
            <p>
              <strong>Настройки на сайта → Контакти</strong> — имейл, телефон и адрес.
              Промяната се отразява навсякъде: контактната страница, футъра, формата.
            </p>
            <p>
              <strong>Начална страница + ЧЗВ</strong> (има отделни версии за български и
              английски) — заглавието на началния екран, подзаглавието, бутоните, числата
              в лентата и всички въпроси/отговори.
            </p>
          </Step>

          <Step num="03" title="Как се публикува">
            <p>
              Натискането на <strong>Publish</strong> записва промяната в GitHub хранилището
              на сайта. Vercel я засича автоматично и след около минута новата версия е на
              живо. Няма бутон „деплой“ — публикуването е автоматично.
            </p>
            <p>
              Ако нещо изглежда счупено след промяна — просто върнете старата стойност и
              публикувайте отново. Всяка промяна се пази в историята на GitHub и нищо не се
              губи безвъзвратно.
            </p>
          </Step>

          <Step num="04" title="Еднократна настройка за продукция (за разработчика)">
            <p>Прави се веднъж при пускането на сайта на живо:</p>
            <ul className="list-none space-y-2">
              <li>1. Качете кода в GitHub хранилище и го свържете с Vercel.</li>
              <li>2. В <code>public/cms/config.yml</code> попълнете <code>repo:</code> и <code>base_url:</code>.</li>
              <li>3. Създайте GitHub OAuth App (Settings → Developer settings): Homepage = адреса на сайта, Callback = <code>https://адреса/api/oauth/callback</code>.</li>
              <li>4. Добавете във Vercel env: <code>GITHUB_OAUTH_CLIENT_ID</code> и <code>GITHUB_OAUTH_CLIENT_SECRET</code>.</li>
              <li>5. Дайте на клиента GitHub акаунт с достъп до хранилището — с него влиза в CMS-а.</li>
            </ul>
            <p>
              За формата: сложете <code>RESEND_API_KEY</code> (акаунт в resend.com, верифициран
              домейн) — запитванията тръгват към <code>uniagent@unitrans.bg</code>.
            </p>
          </Step>

          <Step num="05" title="Какво НЕ пипайте">
            <p>
              Всичко извън админ панела (кодът, дизайнът, структурата) е техническа
              територия. Ако е нужна нова секция, страница или промяна в дизайна — това е
              задача за разработчик, не за CMS-а. Дизайн системата на{" "}
              <code>/bg/design-system</code> документира правилата, по които се прави всяка
              бъдеща промяна.
            </p>
          </Step>
        </div>
      </div>
    </main>
  );
}
