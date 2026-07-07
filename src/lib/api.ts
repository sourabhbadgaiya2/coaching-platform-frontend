import { getAccessToken } from "@/lib/auth";

const BASE_URL = process.env.API_URL;

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown> | null;

  constructor(
    message: string,
    status: number,
    data: Record<string, unknown> | null,
  ) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth: boolean = true,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (requiresAuth) {
    const token = await getAccessToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type");
  const data: Record<string, unknown> | null = contentType?.includes(
    "application/json",
  )
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok) {
    const message =
      (data?.detail as string) ||
      (data?.message as string) ||
      res.statusText ||
      "Something went wrong";
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export const apiGet = <T>(endpoint: string, requiresAuth = true) =>
  request<T>(endpoint, { method: "GET" }, requiresAuth);

export const apiPost = <T>(
  endpoint: string,
  body?: object,
  requiresAuth = true,
) =>
  request<T>(
    endpoint,
    { method: "POST", body: JSON.stringify(body) },
    requiresAuth,
  );

export const apiPatch = <T>(
  endpoint: string,
  body?: object,
  requiresAuth = true,
) =>
  request<T>(
    endpoint,
    { method: "PATCH", body: JSON.stringify(body) },
    requiresAuth,
  );

export const apiDelete = <T>(endpoint: string, requiresAuth = true) =>
  request<T>(endpoint, { method: "DELETE" }, requiresAuth);
