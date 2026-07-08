"use server";

import { apiGet } from "@/lib/api";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function getMyNotifications(): Promise<Notification[]> {
  return apiGet<Notification[]>("/notifications/my/");
}
