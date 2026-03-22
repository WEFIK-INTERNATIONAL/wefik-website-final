import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="bg-bg-primary text-text-primary flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-accent/10 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p className="font-big text-border text-[20vw] leading-none font-black tracking-tighter select-none">
          404
        </p>

        <div className="flex flex-col items-center gap-4">
          <h1 className="font-big text-text-primary text-4xl leading-none font-black tracking-tight uppercase md:text-6xl">
            Page Not Found
          </h1>
          <p className="text-text-muted font-body max-w-md text-base leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-accent hover:bg-accent/90 inline-flex h-14 items-center justify-center rounded-full px-10 text-sm font-bold tracking-[0.15em] text-black uppercase transition-all hover:scale-105 active:scale-95"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border-border text-text-primary hover:border-accent inline-flex h-14 items-center justify-center rounded-full border px-10 text-sm font-bold tracking-[0.15em] uppercase transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
