import { api } from "./client";

export async function getHotCollections() {
  const response = await api.get("/hotCollections"); 
  return response.data;
}

