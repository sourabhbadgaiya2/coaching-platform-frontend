"use server";

import { apiGet } from "@/lib/api";
import { PaginatedResponse } from "@/types";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function getMyNotifications(): Promise<Notification[]> {
  const response =
    await apiGet<PaginatedResponse<Notification>>("/notifications/my/");
  return response.results;
}
