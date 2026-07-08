import { getBatches } from "@/actions/courses.actions";
import { getUpcomingLiveClasses } from "@/actions/live-classes.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateLiveClassDialog } from "./create-live-class-dialog";

export default async function AdminLiveClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const batches = await getBatches();
  const selectedBatchId = params.batch ? Number(params.batch) : batches[0]?.id;
  const liveClasses = selectedBatchId
    ? await getUpcomingLiveClasses(selectedBatchId)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Live Classes</h1>
        <CreateLiveClassDialog batches={batches} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {batches.map((batch) => (
          <a
            key={batch.id}
            href={`/admin/live-classes?batch=${batch.id}`}
            className={`text-sm px-3 py-1 rounded-full border ${
              batch.id === selectedBatchId
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {batch.name}
          </a>
        ))}
      </div>

      <div className="space-y-3">
        {liveClasses.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No upcoming classes for this batch.
          </p>
        )}
        {liveClasses.map((lc) => (
          <Card key={lc.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{lc.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>{new Date(lc.scheduled_at).toLocaleString()}</p>
              <p>{lc.duration_minutes} minutes</p>
              <a
                href={lc.meeting_link}
                target="_blank"
                className="text-primary underline"
              >
                Meeting Link
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
