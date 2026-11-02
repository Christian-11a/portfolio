import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-dvh max-w-[1080px] place-items-center border-line px-5 min-[1081px]:border-x">
      <div className="text-center">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This page does not exist.</h1>
        <p className="mt-4 text-muted">The link may be old, or the address has a typo.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg active:scale-[0.98]"
        >
          <ArrowLeftIcon size={15} /> Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
