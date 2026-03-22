export default function CareersLoading() {
  return (
    <main className="bg-bg-primary min-h-screen">
      {}
      <section className="relative min-h-[90vh] pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-border h-6 w-36 animate-pulse rounded-full" />
              <div className="bg-border h-36 w-80 animate-pulse rounded" />
              <div className="bg-accent h-24 w-56 animate-pulse rounded opacity-60" />
            </div>
            <div className="flex w-full max-w-xl flex-col items-center gap-6">
              <div className="bg-border h-5 w-full animate-pulse rounded" />
              <div className="bg-border h-5 w-4/5 animate-pulse rounded" />
              <div className="bg-border h-16 w-16 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="border-border flex flex-col border-t">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-border border-b py-10 md:py-16">
              <div className="flex flex-col gap-6">
                <div className="bg-border h-4 w-24 animate-pulse rounded" />
                <div className="bg-border h-14 w-3/4 animate-pulse rounded" />
                <div className="flex gap-4">
                  <div className="bg-border h-4 w-20 animate-pulse rounded" />
                  <div className="bg-border h-4 w-20 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
