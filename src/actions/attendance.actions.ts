"use server";

import { apiGet } from "@/lib/api";

interface AttendanceSummary {
  total_days: number;
  present: number;
  absent: number;
  leave: number;
  percentage: number;
}

export async function getMyAttendanceSummary(
  batchId: number,
): Promise<AttendanceSummary> {
  return apiGet<AttendanceSummary>(`/attendance/my/summary/?batch=${batchId}`);
}
