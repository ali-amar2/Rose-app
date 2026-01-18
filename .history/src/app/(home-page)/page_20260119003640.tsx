import Header from "./components/header";
import Footer from "./components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
