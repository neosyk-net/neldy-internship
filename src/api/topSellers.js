import { api } from "./client";

export async function getTopSellers() {
    const response = await api.get("/topSellers");
    return response.data;
}

