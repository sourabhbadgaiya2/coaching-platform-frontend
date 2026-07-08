import { getMyEnrollments } from "@/actions/enrollment.actions";
import { getTests, getMyTestResults } from "@/actions/tests.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function StudentTestsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const enrollments = await getMyEnrollments();
  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const selectedBatchId = params.batch
    ? Number(params.batch)
    : activeEnrollments[0]?.batch;

  const tests = selectedBatchId ? await getTests(selectedBatchId) : [];
  const results = selectedBatchId
    ? await getMyTestResults(selectedBatchId)
    : {};

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Tests</h1>

      {activeEnrollments.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeEnrollments.map((e) => (
            <a
              key={e.batch}
              href={`/student/tests?batch=${e.batch}`}
              className={`text-sm px-3 py-1 rounded-full border whitespace-nowrap ${
                e.batch === selectedBatchId
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {e.batch_name}
            </a>
          ))}
        </div>
      )}

      {tests.length === 0 && (
        <p className="text-sm text-muted-foreground text-center pt-8">
          No tests available.
        </p>
      )}

      <div className="space-y-3">
        {tests.map((test) => {
          const result = results[test.id];

          return (
            <Card key={test.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base">{test.title}</CardTitle>
                {result && <Badge>Completed</Badge>}
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {test.questions.length} questions • {test.duration_minutes}{" "}
                  min
                  {result && ` • Score: ${result.score}`}
                </p>
                <Link
                  href={`/student/tests/${test.id}`}
                  className={cn(
                    buttonVariants({ variant: result ? "outline" : "default" }),
                    "w-full",
                  )}
                >
                  {result ? "View Result" : "Start Test"}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
