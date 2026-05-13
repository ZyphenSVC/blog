import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="flex min-h-[calc(100vh-4rem)] items-center px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#8C86AA]">
            404 / Not Found
          </p>

          <h1 className="max-w-5xl font-mono text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl">
            This page
            <br />
            does not exist.
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-8 text-[#BEB6AD]">
            The route may have moved, been archived, or never existed in the
            first place.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="border border-[#8C86AA] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#EAE0D5] transition hover:bg-[#8C86AA] hover:text-[#252324]"
            >
              Return Home
            </Link>

            <Link
              href="/blog"
              className="border border-[#575253] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C8C0B6] transition hover:border-[#EAE0D5] hover:text-[#EAE0D5]"
            >
              View Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}