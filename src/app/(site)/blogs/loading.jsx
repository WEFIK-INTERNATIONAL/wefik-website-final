export default function BlogsLoading() {
  return (
    <main className="bg-bg-primary min-h-screen">
      {}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex max-w-4xl flex-col gap-6">
            <div className="bg-border h-3 w-32 animate-pulse rounded" />
            <div className="flex flex-wrap gap-3">
              {["Thought", "Leadership", "& Updates"].map((w) => (
                <div
                  key={w}
                  className="bg-border h-16 w-48 animate-pulse rounded"
                />
              ))}
            </div>
            <div className="bg-border h-5 w-80 animate-pulse rounded" />
          </div>
        </div>
      </section>

      {}
      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="bg-border aspect-video w-full animate-pulse rounded-2xl" />
                <div className="bg-border h-3 w-24 animate-pulse rounded" />
                <div className="bg-border h-7 w-full animate-pulse rounded" />
                <div className="bg-border h-4 w-3/4 animate-pulse rounded" />
                <div className="bg-border h-4 w-1/2 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
