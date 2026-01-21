import { OccProps } from "@/lib/types/occasion";
import Footer from "./_components/footer";
import Header from "./_components/header";
import CarouselComponent from "./_components/carousel-component";
import SecondSection from "./_components/second-section";
import BestSellingSection from "./_components/BestSellingSection";
import MostPopularSection from "./_components/MostPopularSection";
import SpecificationsComponent from "./_components/specifications-component";
import { Testimonials } from "./_components/Testimonials";
import EmailStep from "../(auth)/forget-password/_components/email-step";
import NewPasswordStep from "../(auth)/forget-password/_components/new-password-step";

export default function Home({ searchParams }: OccProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col py-10 gap-y-10">
        <h1 className="text-center text-5xl">Just for testing</h1>
        {/* Just For Teasting */}
        <div className="grid grid-cols-2 mx-auto w-fit gap-20 border p-5 ">
          <EmailStep />
          <NewPasswordStep />
        </div>
        <div className="px-20 flex flex-col gap-y-10">
          <CarouselComponent />
          <SecondSection />
          <SpecificationsComponent />
          <BestSellingSection />
          <MostPopularSection searchParams={searchParams} />
        </div>
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
