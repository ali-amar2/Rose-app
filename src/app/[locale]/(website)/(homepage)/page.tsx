import { OccProps } from "@/lib/types/occasion";
import CarouselComponent from "./_components/carousel-component";
import SecondSection from "./_components/second-section";
import BestSellingSection from "./_components/best-selling-section";
import MostPopularSection from "./_components/most-popular-section";
import SpecificationsComponent from "./_components/specifications-component";
import About from "./_components/about";
import Gallery from "./_components/gallery";
import Companies from "./_components/companies";
import TestimonialsSection from "./_components/testimonials";
export default function Home({ searchParams }: OccProps) {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-10 px-6 md:px-8 lg:px-10 xl:px-14 mt-3">
        <CarouselComponent />
        <SecondSection />
        <SpecificationsComponent />
        <BestSellingSection />
        <MostPopularSection searchParams={searchParams} />
        <About />
        <Gallery />
      </div>
      <TestimonialsSection />
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <Companies />
      </div>
    </main>
  );
}
