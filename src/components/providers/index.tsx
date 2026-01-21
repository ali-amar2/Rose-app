import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "../ui/toaster";
import ReactQueryProvider from "./components/react-query-provider";
import { Toaster as HotToastToaster } from "react-hot-toast";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        {children}
        <Toaster />
        <HotToastToaster position="bottom-right" />
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
