export async function getOccasions() {
  const res = await fetch(`${process.env.API}/occasions`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch occasions");
  return res.json();
}
