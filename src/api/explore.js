import { api } from "./client";

export async function getExploreItems(filter = "") {
  const response = await api.get("/explore", {
    params: filter ? { filter } : undefined,
  });

  return response.data;
}
