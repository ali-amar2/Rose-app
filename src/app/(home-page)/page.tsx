import Header from "./components/header";
import Footer from "./components/footer";
import BestSellingSection from "./components/BestSellingSection";
import MostPopularSection from "./components/MostPopularSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col px-20 py-10 gap-y-20">
        <BestSellingSection />
        <MostPopularSection />
      </main>
      <Footer />
    </>
  );
}
