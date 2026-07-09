"use server";

import { apiGet, apiPost, ApiError } from "@/lib/api";
import { ActionState, PaginatedResponse } from "@/types";
import { revalidatePath } from "next/cache";

interface LiveClass {
  id: number;
  batch: number;
  batch_name: string;
  title: string;
  scheduled_at: string;
  meeting_link: string;
  duration_minutes: number;
}

export async function getUpcomingLiveClasses(
  batchId: number,
): Promise<LiveClass[]> {
  const response = await apiGet<PaginatedResponse<LiveClass>>(
    `/live-classes/upcoming/?batch=${batchId}`,
  );
  return response.results;
}

export async function createLiveClass(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const batch = Number(formData.get("batch"));
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const meeting_link = formData.get("meeting_link") as string;
  const duration_minutes = Number(formData.get("duration_minutes"));

  const scheduled_at = new Date(`${date}T${time}`).toISOString();

  try {
    await apiPost("/live-classes/create/", {
      batch,
      title,
      scheduled_at,
      meeting_link,
      duration_minutes,
    });
    revalidatePath("/admin/live-classes");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to schedule class" };
  }
}
