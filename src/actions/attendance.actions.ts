"use server";

import { apiGet, apiPost, ApiError } from "@/lib/api";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

type Status = "present" | "absent" | "leave";

interface AttendanceSummary {
  total_days: number;
  present: number;
  absent: number;
  leave: number;
  percentage: number;
}

interface AttendanceRecord {
  id: number;
  student: number;
  student_name: string;
  batch: number;
  date: string;
  status: "present" | "absent" | "leave";
}

interface StudentInBatch {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export async function getMyAttendanceSummary(
  batchId: number,
): Promise<AttendanceSummary> {
  return apiGet<AttendanceSummary>(`/attendance/my/summary/?batch=${batchId}`);
}

export async function getMyAttendanceHistory(
  batchId: number,
): Promise<AttendanceRecord[]> {
  return apiGet<AttendanceRecord[]>(`/attendance/my/?batch=${batchId}`);
}

export async function getEnrolledStudents(
  batchId: number,
): Promise<StudentInBatch[]> {
  // enrollment list se active students nikaal rahe hain
  const enrollments = await apiGet<
    { student: number; student_name: string; status: string }[]
  >(`/enrollments/all/?status=active`);
  return enrollments
    .filter((e: any) => e.batch === batchId)
    .map((e: any) => ({
      id: e.student,
      username: e.student_name,
      first_name: "",
      last_name: "",
    }));
}

export async function bulkMarkAttendance(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const batch_id = Number(formData.get("batch_id"));
  const date = formData.get("date") as string;
  const recordsJson = formData.get("records") as string;
  const records = JSON.parse(recordsJson);

  try {
    await apiPost("/attendance/bulk-mark/", { batch_id, date, records });
    revalidatePath("/admin/attendance");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to mark attendance" };
  }
}

export async function getAttendanceForDate(
  batchId: number,
  date: string,
): Promise<Record<number, Status>> {
  const records = await apiGet<{ student: number; status: Status }[]>(
    `/attendance/?batch=${batchId}&date=${date}`,
  );
  return Object.fromEntries(records.map((r) => [r.student, r.status]));
}
