"use server";

import { getToken } from "../utils/manage-token";

export async function getPersonalizedRecommendations(id: string) {
  const token = await getToken();
  const userToken = token?.accessToken;

  if (!userToken) {
    console.error("No token found for user:", id);
    return { recommendations: [] };
  }

  const res = await fetch(`${process.env.API}/related/recommendations/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch personalized recommendations for product ${id}`
    );
  }

  return await res.json();
}
