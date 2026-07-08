import { getMyEnrollments } from "@/actions/enrollment.actions";
import {
  getMyAttendanceSummary,
  getMyAttendanceHistory,
} from "@/actions/attendance.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function StudentAttendancePage({
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

  const [summary, history] = selectedBatchId
    ? await Promise.all([
        getMyAttendanceSummary(selectedBatchId),
        getMyAttendanceHistory(selectedBatchId),
      ])
    : [null, []];

  const statusColor: Record<string, string> = {
    present: "bg-green-600",
    absent: "bg-red-600",
    leave: "bg-yellow-600",
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Attendance</h1>

      {activeEnrollments.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeEnrollments.map((e) => (
            <a
              key={e.batch}
              href={`/student/attendance?batch=${e.batch}`}
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

      {summary && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{summary.percentage}%</p>
            <p className="text-sm text-muted-foreground">
              {summary.present} present / {summary.total_days} total days
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {history.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <span className="text-sm">
              {new Date(record.date).toLocaleDateString()}
            </span>
            <Badge className={statusColor[record.status]}>
              {record.status}
            </Badge>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-sm text-muted-foreground text-center pt-4">
            No attendance records yet.
          </p>
        )}
      </div>
    </div>
  );
}
