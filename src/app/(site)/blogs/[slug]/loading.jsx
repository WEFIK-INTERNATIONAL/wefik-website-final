export default function BlogPostLoading() {
  return (
    <article className="bg-bg-primary min-h-screen">
      <header className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <div className="bg-border h-4 w-24 animate-pulse rounded" />
          <div className="bg-border h-6 w-36 animate-pulse rounded-full" />
          <div className="bg-border h-20 w-2/3 animate-pulse rounded" />
          <div className="flex items-center gap-6">
            <div className="bg-border h-10 w-10 animate-pulse rounded-full" />
            <div className="bg-border h-4 w-32 animate-pulse rounded" />
            <div className="bg-border h-4 w-24 animate-pulse rounded" />
          </div>
        </div>
      </header>
      <section className="mx-auto mb-24 max-w-7xl px-6">
        <div className="bg-border aspect-21/9 w-full animate-pulse rounded-3xl" />
      </section>
      <section className="relative pb-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-border h-5 w-full animate-pulse rounded"
              style={{ width: `${70 + (i % 3) * 10}%` }}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
