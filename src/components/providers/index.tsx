import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "../ui/toaster";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
