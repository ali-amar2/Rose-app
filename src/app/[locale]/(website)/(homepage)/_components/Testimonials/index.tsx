import { getTestimonials } from "@/lib/services/testimonials.service";
import TestimonialsContent from "./testimonial-content";

export default async function TestimonialsSection() {
  const data = await getTestimonials();

  return <TestimonialsContent data={data} />;
}
