import { getAccessToken } from "@/lib/auth";

const BASE_URL = process.env.API_URL;

// ✅ Simple in-memory cache for GET requests (5 min TTL)
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(endpoint: string, requiresAuth: boolean): string {
  return `${endpoint}:${requiresAuth}`;
}

function getCachedData<T>(endpoint: string, requiresAuth: boolean): T | null {
  const key = getCacheKey(endpoint, requiresAuth);
  const entry = cache.get(key);

  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }

  cache.delete(key);
  return null;
}

function setCachedData<T>(
  endpoint: string,
  requiresAuth: boolean,
  data: T,
): void {
  const key = getCacheKey(endpoint, requiresAuth);
  cache.set(key, { data, timestamp: Date.now() });
}

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

export const apiGet = <T>(endpoint: string, requiresAuth = true) => {
  // ✅ Check cache first for GET requests
  const cachedData = getCachedData<T>(endpoint, requiresAuth);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return request<T>(endpoint, { method: "GET" }, requiresAuth).then((data) => {
    setCachedData(endpoint, requiresAuth, data);
    return data;
  });
};

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
