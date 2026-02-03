import { api } from "./client";

export async function getAuthorById(authorId) {
  const response = await api.get("/authors", {
    params: { author: authorId },
  });

  return response.data;
}
