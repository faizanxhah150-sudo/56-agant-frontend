// Thin wrapper around fetch() for calling the Worker backend.
// VITE_API_BASE_URL is set in .env (see .env.example) once the Worker
// is deployed. Until then, calls will fail with a clear "not configured"
// error rather than a confusing network error.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiPost(path, body) {
  if (!API_BASE_URL) {
    throw new ApiError(
      "This tool needs the backend API to be configured. Set VITE_API_BASE_URL in your .env file to your deployed Worker URL (see README).",
      0
    );
  }

  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Could not reach the backend API. Check your connection and try again.", 0);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new ApiError(`The backend returned an unexpected response (HTTP ${res.status}).`, res.status);
  }

  if (!res.ok) {
    throw new ApiError(data?.error || `Request failed (HTTP ${res.status}).`, res.status);
  }

  return data;
}
