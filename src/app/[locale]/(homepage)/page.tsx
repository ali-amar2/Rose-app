import { OccProps } from "@/lib/types/occasion";
import CarouselComponent from "./_components/carousel-component";
import SecondSection from "./_components/second-section";
import BestSellingSection from "./_components/BestSellingSection";
import MostPopularSection from "./_components/MostPopularSection";
import SpecificationsComponent from "./_components/specifications-component";
import { Testimonials } from "./_components/Testimonials";
<<<<<<< HEAD
import { ProductImage } from "@/components/shared/product-image";
=======
import About from "./_components/about";
import Gallery from "./_components/gallery";
import Companies from "./_components/companies";
>>>>>>> d4af36935778edf96524dcb3040e30d551751b12

export default function Home({ searchParams }: OccProps) {
  // this is for testing error page
  // throw new Error("test");
  return (
    <>
      <main className="flex flex-col py-10 gap-y-10">
        <div className="px-20 flex flex-col gap-y-10">
          <CarouselComponent />
          <SecondSection />
          <SpecificationsComponent />
          <BestSellingSection />
          <MostPopularSection searchParams={searchParams} />
          <About />
          <Gallery />
        </div>
        <Testimonials />
        <div className="px-20 gap-y-10">
          <Companies />
        </div>
      </main>
      <ProductImage />
    </>
  );
}
