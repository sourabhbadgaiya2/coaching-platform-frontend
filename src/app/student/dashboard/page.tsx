import { getMyEnrollments } from "@/actions/enrollment.actions";
import { getMyAttendanceSummary } from "@/actions/attendance.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function StudentDashboard() {
  const enrollments = await getMyEnrollments();
  const activeEnrollments = enrollments.filter((e) => e.status === "active");

  const attendanceData = await Promise.all(
    activeEnrollments.map(async (e) => ({
      batch: e,
      summary: await getMyAttendanceSummary(e.batch),
    })),
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">My Dashboard</h1>

      {activeEnrollments.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No active batches yet.</p>
            <Link
              href="/student/batches"
              className="text-primary text-sm underline"
            >
              Browse batches to enroll
            </Link>
          </CardContent>
        </Card>
      )}

      {attendanceData.map(({ batch, summary }) => (
        <Card key={batch.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{batch.batch_name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Attendance</span>
              <Badge
                variant={summary.percentage >= 75 ? "default" : "destructive"}
              >
                {summary.percentage}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.present} present / {summary.total_days} total days
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
