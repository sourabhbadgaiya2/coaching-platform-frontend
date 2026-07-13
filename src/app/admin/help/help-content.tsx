"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    body: [
      "Every batch follows the same order: create a Subject, then a Course (attach subjects to it), then a Batch under that course.",
      "You only see students, attendance, and materials for a batch once it exists — so this order matters.",
    ],
  },
  {
    id: "courses-batches",
    title: "Courses & Batches",
    body: [
      "Go to Courses & Batches. Use 'Add Course' to create a course and attach subjects to it.",
      "Use 'Add Batch' to create a timing group under that course — e.g. 'Morning Batch' or 'Evening Batch'. A course can have multiple batches.",
    ],
  },
  {
    id: "enrollments",
    title: "Enrollments & Payments",
    body: [
      "When a student requests to join a batch, it shows up under Enrollments with status 'Pending'.",
      "Payments are collected offline (cash, UPI, bank transfer) — there's no online payment gateway.",
      "Once you've received payment, click 'Mark Paid' on that enrollment and fill in the amount, mode, and date. This unlocks the batch for that student — they'll now see materials, live classes, and tests.",
      "If a request shouldn't be approved, use 'Reject' instead.",
    ],
  },
  {
    id: "attendance",
    title: "Marking Attendance",
    body: [
      "Go to Attendance, pick a batch, and pick a date (defaults to today).",
      "Use 'Mark All Present' or 'Mark All Absent' to set everyone at once, then adjust individual students as needed.",
      "If you reopen a date you've already marked, it loads the saved statuses instead of resetting — so you can safely go back and correct a day.",
      "Students only see attendance for batches they're active (paid) in.",
    ],
  },
  {
    id: "materials",
    title: "Materials (Recorded Lectures & Notes)",
    body: [
      "Go to Materials, pick a batch, and click 'Upload Material'.",
      "For videos: upload to YouTube as 'Unlisted' and paste the link — don't upload large video files directly, they'll be slow and eat storage.",
      "For notes/PDFs, use the file upload option instead.",
      "Only students with an active (paid) enrollment in that batch can see the material.",
    ],
  },
  {
    id: "live-classes",
    title: "Live Classes",
    body: [
      "Go to Live Classes, pick a batch, and click 'Schedule Class'.",
      "Paste your Zoom/Google Meet link, set the date, time, and duration.",
      "Enrolled students automatically get a reminder notification 30 minutes before the class starts.",
    ],
  },
  {
    id: "tests",
    title: "Tests & Quizzes",
    body: [
      "Go to Tests, pick a batch, and click 'Create Test'.",
      "Add questions one at a time. For each question, add at least 2 options and mark the correct one using the radio button.",
      "Students can attempt a test only once — scoring is automatic based on the correct option you marked.",
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    body: [
      "Students automatically get a notification 30 minutes before a live class.",
      "There's no manual 'send notification' button yet — reminders are automatic only, tied to live classes.",
    ],
  },
  {
    id: "faq",
    title: "Common Questions",
    body: [
      "Q: A student says they can't see materials. A: Check their Enrollment status — they need to be 'Active', which only happens after you Mark Paid.",
      "Q: Can I edit a course/batch after creating it? A: Not from the app yet — use the Django Admin panel (/admin) for edits and deletions.",
      "Q: A student is enrolled in the wrong batch. A: Reject their current enrollment from Django Admin and ask them to request the correct batch again.",
    ],
  },
];

export function HelpContent() {
  const [active, setActive] = useState(sections[0].id);

  const scrollTo = (id: string) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-8">
      <nav className="hidden md:block w-56 shrink-0 sticky top-6 self-start space-y-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={cn(
              "block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
              active === s.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {s.title}
          </button>
        ))}
      </nav>

      <div className="flex-1 space-y-10 max-w-2xl">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-6">
            <h2 className="text-lg font-semibold mb-3">{s.title}</h2>
            <div className="space-y-2">
              {s.body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
