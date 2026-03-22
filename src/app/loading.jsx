export default function AppLoading() {
  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {}
        <svg
          viewBox="0 0 155.41 89.43"
          className="h-12 w-auto animate-pulse"
          aria-label="Loading…"
        >
          <path
            fill="#A3E635"
            d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85
              L9.34,27.6L0.28,5.05C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
          />
          <path
            fill="#51731A"
            d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96
              c-0.99,2.44-4.08,3.19-6.08,1.48L91.49,64.67l-23.72-20.2L149.72,0.47z"
          />
        </svg>
        <div className="bg-border h-1 w-48 overflow-hidden rounded-full">
          <div className="bg-accent h-full w-1/2 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full" />
        </div>
      </div>
    </div>
  );
}
