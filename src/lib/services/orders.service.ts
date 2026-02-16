export async function getOrders() {
  const response = await fetch("/api/orders", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Something went wrong");
  }

  return response.json();
}
