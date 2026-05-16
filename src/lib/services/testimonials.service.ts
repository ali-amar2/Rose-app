import { TestimonialsResponse } from "@/lib/types/testimonial";

export async function getTestimonials(): Promise<TestimonialsResponse> {
  const res = await fetch(`${process.env.API}/testimonials`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  return res.json();
}
