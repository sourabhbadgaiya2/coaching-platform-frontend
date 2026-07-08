import { getTests, getTestResult } from "@/actions/tests.actions";
import { getMyEnrollments } from "@/actions/enrollment.actions";
import { TestAttemptClient } from "./test-attempt-client";
import { ResultView } from "./result-view";

export default async function TestAttemptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testId = Number(id);

  // Pehle check karo already attempt kiya hua hai ya nahi
  const existingResult = await getTestResult(testId);
  if (existingResult) {
    return <ResultView result={existingResult} />;
  }

  // Test details fetch karo — student ke sabhi enrollments se dhoondo
  const enrollments = await getMyEnrollments();
  let test = null;
  for (const enrollment of enrollments.filter((e) => e.status === "active")) {
    const tests = await getTests(enrollment.batch);
    test = tests.find((t) => t.id === testId);
    if (test) break;
  }

  if (!test) {
    return (
      <p className="p-4 text-center text-muted-foreground">Test not found.</p>
    );
  }

  return <TestAttemptClient test={test} />;
}
