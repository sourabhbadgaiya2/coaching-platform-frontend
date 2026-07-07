"use server";

import { apiPost, apiGet, ApiError } from "@/lib/api";
import { setAuthCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthResponse, ActionState } from "@/types";

export async function loginAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  let role: string;

  try {
    const data = await apiPost<AuthResponse>(
      "/auth/login/",
      { username, password },
      false,
    );
    await setAuthCookies(data.access, data.refresh, data.user.role);
    role = data.user.role;
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Something went wrong. Try again." };
  }

  redirect(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
}

export async function getMeAction(): Promise<AuthResponse | null> {
  try {
    const data = await apiGet<AuthResponse>("/auth/me/");
    console.log("Login successful:", data);

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
    throw error;
  }
}
