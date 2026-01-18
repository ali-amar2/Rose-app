export async function getProducts(params: ProductsParams = {}) {
  const query = new URLSearchParams();

  if (params.sort) query.append("sort", params.sort);
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.occasion) query.append("occasion", params.occasion);

  const res = await fetch(`${process.env.API}/products?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
