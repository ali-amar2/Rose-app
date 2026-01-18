import Header from "./components/header";
import Footer from "./components/footer";
import BestSellingSection from "@/app/(homepage)/_components/BestSellingSection";
import MostPopularSection from "@/app/(homepage)/_components/MostPopularSection";
export default function Home() {
  return (
    <>
      <Header />
      <main className="px-20 py-10 space-y-[8.625rem]">
        <BestSellingSection />
        <MostPopularSection />
      </main>
      <Footer />
    </>
  );
}
