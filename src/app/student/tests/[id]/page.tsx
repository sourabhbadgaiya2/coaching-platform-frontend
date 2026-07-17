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

  // First check whether the test has already been attempted
  const existingResult = await getTestResult(testId);
  if (existingResult) {
    return <ResultView result={existingResult} />;
  }

  // Fetch test details by finding them from all the student's enrollments
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
