export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p
        className="font-display select-none text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-[-0.05em] text-transparent"
        style={{ WebkitTextStroke: "2px #e7e9ee" }}
        aria-hidden
      >
        404
      </p>
      <h1 className="font-display mt-6 text-h3">Страницата не е намерена.</h1>
      <p className="mt-2 text-slate">The page you are looking for does not exist.</p>
      <div className="mt-10 flex gap-4">
        <a
          href="/bg"
          className="bg-ink px-7 py-4 text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-navy"
        >
          Начало
        </a>
        <a
          href="/en"
          className="border border-ink/25 px-7 py-4 text-[0.9375rem] font-semibold transition-colors duration-300 hover:border-ink"
        >
          Home
        </a>
      </div>
    </main>
  );
}
