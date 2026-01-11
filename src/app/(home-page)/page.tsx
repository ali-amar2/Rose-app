import InputField from "@/components/shared/input-field";
import Header from "./components/header";
import Footer from "./components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <form className="w-80">
          <InputField
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
          />

          <InputField
            label="Email"
            type="emai"
            name="emai"
            placeholder="Enter your Emai"
          />
          <InputField
            label="Pawword"
            type="password"
            name="password"
            placeholder="Enter your Password"
          />
          <InputField
            label="Confirm Pawword"
            type="password"
            name="password"
            placeholder="Enter your Confirm Password"
          />
          <Button type="submit" className=" my-5">
            Submit
          </Button>
        </form>

        {/* Add more content here as needed */}
      </main>
      <Footer />
    </>
  );
}
