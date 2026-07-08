import { getBatches } from "@/actions/courses.actions";
import { getEnrolledStudents } from "@/actions/attendance.actions";
import { MarkAttendanceForm } from "./mark-attendance-form";
import Link from "next/link";

export default async function AdminAttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string }>;
}) {
  const params = await searchParams;
  const batches = await getBatches();
  const selectedBatchId = params.batch ? Number(params.batch) : batches[0]?.id;
  const students = selectedBatchId
    ? await getEnrolledStudents(selectedBatchId)
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mark Attendance</h1>

      <div className="flex gap-2 flex-wrap">
        {batches.map((batch) => (
          <Link
            key={batch.id}
            href={`/admin/attendance?batch=${batch.id}`}
            className={`text-sm px-3 py-1 rounded-full border ${
              batch.id === selectedBatchId
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {batch.name}
          </Link>
        ))}
      </div>

      {selectedBatchId && (
        <MarkAttendanceForm batchId={selectedBatchId} students={students} />
      )}
    </div>
  );
}
