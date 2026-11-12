import type {
  BootstrapPayload,
  CaseDetail,
  EntityDetail,
  SearchPayload
} from "../shared/types";

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

export const api = {
  bootstrap: () => request<BootstrapPayload>("/api/bootstrap"),
  caseDetail: (id: string) =>
    request<CaseDetail>(`/api/cases/${encodeURIComponent(id)}`),
  entityDetail: (id: string) =>
    request<EntityDetail>(`/api/entities/${encodeURIComponent(id)}`),
  search: (query: string, signal?: AbortSignal) =>
    request<SearchPayload>(
      `/api/search?q=${encodeURIComponent(query)}`,
      signal
    )
};
