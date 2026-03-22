export default function WorksLoading() {
  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-24 md:pt-48">
      <div className="mx-auto max-w-7xl px-6">
        {}
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <div className="bg-border h-3 w-24 animate-pulse rounded" />
            <div className="bg-border h-20 w-72 animate-pulse rounded" />
            <div className="bg-accent h-16 w-48 animate-pulse rounded opacity-60" />
          </div>
          <div className="bg-border h-16 w-64 animate-pulse rounded" />
        </div>

        {}
        <div className="mb-12 flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-border h-9 w-20 animate-pulse rounded-full"
            />
          ))}
        </div>

        {}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="bg-border aspect-video w-full animate-pulse rounded-2xl" />
              <div className="bg-border h-6 w-3/4 animate-pulse rounded" />
              <div className="bg-border h-4 w-1/2 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
