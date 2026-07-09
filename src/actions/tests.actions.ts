"use server";

import { apiGet, apiPost, ApiError } from "@/lib/api";
import { ActionState, PaginatedResponse } from "@/types";
import { revalidatePath } from "next/cache";

interface Option {
  id: number;
  text: string;
  is_correct?: boolean; // sirf admin-view mein aayega
}

interface Question {
  id: number;
  text: string;
  marks: number;
  options: Option[];
}

interface Test {
  id: number;
  batch: number;
  title: string;
  duration_minutes: number;
  questions: Question[];
}

interface AttemptResult {
  test: string;
  score: number;
  submitted_at: string;
}

export async function getTests(batchId: number): Promise<Test[]> {
  const response = await apiGet<PaginatedResponse<Test>>(
    `/tests/?batch=${batchId}`,
  );
  return response.results;
}

export async function startTest(testId: number) {
  return apiPost(`/tests/${testId}/start/`, {});
}

export async function submitTest(
  testId: number,
  answers: { question_id: number; selected_option_id: number }[],
): Promise<ActionState> {
  try {
    await apiPost(`/tests/${testId}/submit/`, { answers });
    revalidatePath(`/student/tests`);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to submit test" };
  }
}

export async function getTestResult(
  testId: number,
): Promise<AttemptResult | null> {
  try {
    return await apiGet<AttemptResult>(`/tests/${testId}/result/`);
  } catch {
    return null;
  }
}

// Admin — nested create
export async function createTest(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const batch = Number(formData.get("batch"));
  const title = formData.get("title") as string;
  const duration_minutes = Number(formData.get("duration_minutes"));
  const questionsJson = formData.get("questions") as string;
  const questions = JSON.parse(questionsJson);

  try {
    await apiPost("/tests/create/", {
      batch,
      title,
      duration_minutes,
      questions,
    });
    revalidatePath("/admin/tests");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to create test" };
  }
}

export async function getMyTestResults(
  batchId: number,
): Promise<Record<number, AttemptResult>> {
  const tests = await getTests(batchId);
  const results: Record<number, AttemptResult> = {};

  await Promise.all(
    tests.map(async (test) => {
      const result = await getTestResult(test.id);
      if (result) results[test.id] = result;
    }),
  );

  return results;
}
