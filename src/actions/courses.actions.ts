"use server";

import { apiGet, apiPost, ApiError } from "@/lib/api";
import {
  Course,
  Batch,
  Subject,
  ActionState,
  PaginatedResponse,
} from "@/types";
import { revalidatePath } from "next/cache";

// export async function getCourses(): Promise<Course[]> {
//   return apiGet<Course[]>("/courses/");
// }
export async function getCourses(): Promise<Course[]> {
  const response = await apiGet<PaginatedResponse<Course>>("/courses/");
  return response.results;
}
export async function getSubjects(): Promise<Subject[]> {
  const response = await apiGet<PaginatedResponse<Subject>>("/subjects/");
  return response.results;
}

export async function getBatches(courseId?: number): Promise<Batch[]> {
  const query = courseId ? `?course=${courseId}` : "";
  const response = await apiGet<PaginatedResponse<Batch>>(`/batches/${query}`);
  return response.results;
}

// export async function getSubjects(): Promise<Subject[]> {
//   return apiGet<Subject[]>("/subjects/");
// }

// export async function getBatches(courseId?: number): Promise<Batch[]> {
//   const query = courseId ? `?course=${courseId}` : "";
//   return apiGet<Batch[]>(`/batches/${query}`);
// }

export async function createCourse(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration_months = Number(formData.get("duration_months"));
  const subject_ids = formData.getAll("subject_ids").map(Number);

  try {
    await apiPost("/courses/", {
      name,
      description,
      duration_months,
      subject_ids,
    });
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to create course" };
  }
}

export async function createBatch(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const course = Number(formData.get("course"));
  const name = formData.get("name") as string;
  const start_date = formData.get("start_date") as string;
  const timing = formData.get("timing") as string;
  const capacity = Number(formData.get("capacity"));

  try {
    await apiPost("/batches/", { course, name, start_date, timing, capacity });
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to create batch" };
  }
}
