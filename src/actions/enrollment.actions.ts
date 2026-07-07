"use server";

import { apiPost, apiGet, apiPatch, ApiError } from "@/lib/api";
import { Enrollment, ActionState } from "@/types";
import { revalidatePath } from "next/cache";

export async function getEnrollments(status?: string): Promise<Enrollment[]> {
  const query = status ? `?status=${status}` : "";
  return apiGet<Enrollment[]>(`/enrollments/all/${query}`);
}

export async function markPaid(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const enrollmentId = formData.get("enrollment_id") as string;
  const amount = Number(formData.get("amount"));
  const mode = formData.get("mode") as string;
  const paid_on = formData.get("paid_on") as string;
  const notes = formData.get("notes") as string;

  try {
    await apiPatch(`/enrollments/${enrollmentId}/mark-paid/`, {
      amount,
      mode,
      paid_on,
      notes,
    });
    revalidatePath("/admin/enrollments");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to mark payment" };
  }
}

export async function rejectEnrollment(
  enrollmentId: number,
): Promise<ActionState> {
  try {
    await apiPatch(`/enrollments/${enrollmentId}/reject/`);
    revalidatePath("/admin/enrollments");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to reject enrollment" };
  }
}

// students actions
export async function getMyEnrollments(): Promise<Enrollment[]> {
  return apiGet<Enrollment[]>("/enrollments/my/");
}

export async function requestEnrollment(batchId: number): Promise<ActionState> {
  try {
    await apiPost("/enrollments/", { batch: batchId });
    revalidatePath("/student/batches");
    revalidatePath("/student/dashboard");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to enroll" };
  }
}
