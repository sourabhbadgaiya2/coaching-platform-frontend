import { getMyEnrollments } from "@/actions/enrollment.actions";
import { getUpcomingLiveClasses } from "@/actions/live-classes.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function StudentLiveClassesPage({
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

  const liveClasses = selectedBatchId
    ? await getUpcomingLiveClasses(selectedBatchId)
    : [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Live Classes</h1>

      {activeEnrollments.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeEnrollments.map((e) => (
            <a
              key={e.batch}
              href={`/student/live-classes?batch=${e.batch}`}
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

      {liveClasses.length === 0 && (
        <p className="text-sm text-muted-foreground text-center pt-8">
          No upcoming classes.
        </p>
      )}

      <div className="space-y-3">
        {liveClasses.map((lc) => (
          <Card key={lc.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{lc.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {new Date(lc.scheduled_at).toLocaleString()}
              </p>
              <a
                href={lc.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
              >
                Join Class
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
