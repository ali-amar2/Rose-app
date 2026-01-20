import { RouteProps } from "@/lib/types/global";
import { getTranslations } from "next-intl/server";
import { Testimonials } from "./_components/Testimonials";
import Header from "./_components/header";
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
import CarouselComponent from "./_components/carousel-component";
import SecondSection from "./_components/second-section";
import SpecificationsComponent from "./_components/specifications-component";
import Footer from "./_components/footer";
import VerifyOtp from "../(auth)/forget-password/_components/verify-otp";

export async function generateMetadata({ params: { locale } }: RouteProps) {
  // translation function
  const t = await getTranslations({ locale });

  return {
    title: t("home"),
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <form className="w-80">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              // error={!!error}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>

            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="search">Search</FieldLabel>
            <Input id="search" name="search" search placeholder="Search..." />
          </Field>

          <Button type="submit" className=" my-5">
            Submit
          </Button>
        </form>
      </main>
      {/* Add more content here as needed */}
      <CarouselComponent />
      <SecondSection />
      <SpecificationsComponent />
      <Testimonials />
      <Footer />
      <div className="my-44">
        <VerifyOtp />
      </div>
    </>
  );
}
