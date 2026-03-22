export default function WorkDetailLoading() {
  return (
    <article className="bg-bg-primary min-h-screen pb-32">
      <div className="bg-border relative h-[70vh] w-full animate-pulse md:h-[85vh]" />
      <section className="mx-auto mt-24 max-w-7xl px-6 md:mt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-8 border-l border-white/5 pl-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-border h-3 w-16 animate-pulse rounded" />
                <div className="bg-border h-6 w-32 animate-pulse rounded" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-border h-4 w-28 animate-pulse rounded" />
            <div className="bg-border h-24 w-full animate-pulse rounded" />
          </div>
        </div>
      </section>
    </article>
  );
}
