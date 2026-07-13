import { redirect } from "next/navigation";
import { getAccessToken, getUserRole } from "@/lib/auth";
import Link from "next/link";
import { HeroScene } from "@/components/landing/hero-scene";

const subjects = [
  { tag: "PHY", label: "Live doubt sessions" },
  { tag: "CHEM", label: "Recorded lectures, anytime" },
  { tag: "MATH", label: "Tests with instant results" },
  { tag: "BIO", label: "Attendance you can track" },
];

const timetable = [
  { time: "6:00 AM", batch: "Morning Batch", note: "Physics — Mechanics" },
  { time: "4:00 PM", batch: "Evening Batch", note: "Chemistry — Organic" },
  { time: "7:30 PM", batch: "Evening Batch", note: "Doubt Session" },
];

export default async function LandingPage() {
  const token = await getAccessToken();
  const role = await getUserRole();

  if (token) {
    redirect(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
  }

  return (
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--ink" as any]: "#16241C",
        ["--chalk" as any]: "#F3EFE3",
        ["--brass" as any]: "#C98A2C",
        ["--stamp" as any]: "#A6342A",
        ["--slate" as any]: "#5C6B60",
      }}
      className="min-h-screen bg-[var(--ink)] text-[var(--chalk)] font-[family-name:var(--font-body)]"
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
          Batch
        </span>
        <Link
          href="/login"
          className="text-sm px-4 py-2 rounded-full border border-[var(--chalk)]/25 hover:border-[var(--brass)] hover:text-[var(--brass)] transition-colors"
        >
          Log in
        </Link>
      </nav>

      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-10 px-5 md:px-12 pt-4 md:pt-16 pb-14 md:pb-20 items-center max-w-6xl mx-auto">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--brass)] mb-4">
            BATCH 2027 · ADMISSIONS OPEN
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6">
            One place for the whole batch.
          </h1>
          <p className="text-[var(--chalk)]/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Live classes, recorded lectures, tests, and attendance — everything
            your coaching runs on, in one app your students already have in
            their pocket.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-[var(--brass)] text-[var(--ink)] font-medium hover:brightness-110 transition"
            >
              Enroll now
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-full border border-[var(--chalk)]/25 hover:border-[var(--chalk)]/60 transition"
            >
              I already study here
            </Link>
          </div>
        </div>
        <div className="h-56 sm:h-72 md:h-[420px] relative">
          <HeroScene />
        </div>
      </section>

      {/* Subject tags — what you get */}
      <section className="px-5 md:px-12 py-14 md:py-16 border-t border-[var(--chalk)]/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--brass)] mb-8">
            WHAT'S INSIDE
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((s) => (
              <div
                key={s.tag}
                className="border border-[var(--chalk)]/15 rounded-xl p-5 hover:border-[var(--brass)]/50 transition-colors"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--brass)]">
                  {s.tag}
                </span>
                <p className="mt-3 text-sm text-[var(--chalk)]/80 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable preview — grounded structural device */}
      <section className="px-5 md:px-12 py-14 md:py-16 border-t border-[var(--chalk)]/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--brass)] mb-8">
            TODAY'S TIMETABLE
          </p>
          <div className="divide-y divide-[var(--chalk)]/10 border-y border-[var(--chalk)]/10">
            {timetable.map((row) => (
              <div
                key={row.time}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4 font-[family-name:var(--font-mono)] text-sm"
              >
                <span className="text-[var(--brass)] sm:w-20 sm:shrink-0">
                  {row.time}
                </span>
                <span className="text-[var(--chalk)]/60 sm:w-36 sm:shrink-0">
                  {row.batch}
                </span>
                <span className="text-[var(--chalk)]/90">{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 md:px-12 py-14 md:py-16 border-t border-[var(--chalk)]/10 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl mb-6 max-w-xl mx-auto px-2">
          Your seat in the batch is one form away.
        </h2>
        <Link
          href="/register"
          className="inline-block px-8 py-3 rounded-full bg-[var(--brass)] text-[var(--ink)] font-medium hover:brightness-110 transition"
        >
          Get started
        </Link>
      </section>

      <footer className="px-5 md:px-12 py-8 text-xs text-[var(--chalk)]/40 font-[family-name:var(--font-mono)] flex flex-col sm:flex-row gap-1 sm:justify-between">
        <span>© 2026 Batch</span>
        <span>Made for students who show up</span>
      </footer>
    </div>
  );
}
