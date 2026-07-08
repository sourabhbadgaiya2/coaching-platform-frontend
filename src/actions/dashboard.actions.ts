"use server";

import { apiGet } from "@/lib/api";

interface DashboardSummary {
  total_students: number;
  active_enrollments: number;
  pending_payments: number;
  todays_live_classes: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiGet<DashboardSummary>("/admin/dashboard/summary/");
}
