export async function getOrders() {
  const response = await fetch("/api/orders", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}
