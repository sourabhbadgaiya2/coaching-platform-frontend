import { getBatches } from "@/actions/courses.actions";
import { getTests } from "@/actions/tests.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTestDialog } from "./create-test-dialog";

export default async function AdminTestsPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const batches = await getBatches();
  const selectedBatchId = params.batch ? Number(params.batch) : batches[0]?.id;
  const tests = selectedBatchId ? await getTests(selectedBatchId) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tests</h1>
        <CreateTestDialog batches={batches} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {batches.map((batch) => (
          <a
            key={batch.id}
            href={`/admin/tests?batch=${batch.id}`}
            className={`text-sm px-3 py-1 rounded-full border ${
              batch.id === selectedBatchId ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {batch.name}
          </a>
        ))}
      </div>

      <div className="space-y-3">
        {tests.length === 0 && (
          <p className="text-sm text-muted-foreground">No tests for this batch yet.</p>
        )}
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{test.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {test.questions.length} questions • {test.duration_minutes} minutes
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}