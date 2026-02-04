import { api } from "./client";

export async function getItemDetailsById(nftId) {
  const response = await api.get("/itemDetails", {
    params: { nftId }, 
  });

  return response.data;
}
