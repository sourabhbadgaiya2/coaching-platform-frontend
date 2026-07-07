"use server";

import { apiGet, ApiError } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";

interface Material {
  id: number;
  batch: number;
  batch_name: string;
  subject: number | null;
  title: string;
  file: string | null;
  video_url: string;
  uploaded_at: string;
}

export async function getMaterials(batchId: number): Promise<Material[]> {
  return apiGet<Material[]>(`/materials/?batch=${batchId}`);
}

export async function getAllMaterials(): Promise<Material[]> {
  // Admin sabhi batches ke materials dekhna chahega, isliye batch filter ke bina bhi ek option rakhte hain
  return apiGet<Material[]>(`/materials/all/`);
}

export async function uploadMaterial(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const token = await getAccessToken();

  // Remove empty file field
  const file = formData.get("file");

  if (file instanceof File && file.size === 0) {
    formData.delete("file");
  }

  try {
    const res = await fetch(`${process.env.API_URL}/materials/upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData directly bhej rahe hain — file upload ke liye JSON nahi, multipart chahiye
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("Upload failed:", errorData);
      throw new ApiError(
        errorData?.detail || "Upload failed",
        res.status,
        errorData,
      );
    }

    revalidatePath("/admin/materials");
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    return { error: "Failed to upload material" };
  }
}
