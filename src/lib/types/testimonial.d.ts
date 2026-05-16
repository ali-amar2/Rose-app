export type TestimonialUser = {
  firstName: string;
  lastName: string;
  photo: string;
};

export type Testimonial = {
  _id: string;
  user: TestimonialUser;
  rating: number;
  content: string;
  updatedAt: string;
};

export type TestimonialsMetadata = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
};

export type TestimonialsResponse = {
  message: string;
  metadata: TestimonialsMetadata;
  testimonials: Testimonial[];
};
