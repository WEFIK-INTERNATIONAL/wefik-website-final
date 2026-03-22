export default function JobDetailLoading() {
  return (
    <article className="bg-bg-primary min-h-screen pt-32 pb-32 md:pt-48">
      <div className="mx-auto max-w-4xl px-6">
        <div className="bg-border mb-12 h-4 w-32 animate-pulse rounded" />
        <div className="mb-16 flex flex-col gap-6">
          <div className="bg-border h-20 w-2/3 animate-pulse rounded" />
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-border h-5 w-28 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="bg-border h-8 w-48 animate-pulse rounded" />
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="bg-border h-5 w-full animate-pulse rounded"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
