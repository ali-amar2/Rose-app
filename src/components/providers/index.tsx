import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "../ui/toaster";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import ReactQueryProvider from "./components/react-query-provider";
import { ToastContextProvider } from "@/context/toast-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <ToastContextProvider>
          <ToastProvider>
            {children}
            <ToastViewport />
          </ToastProvider>
          <Toaster />
        </ToastContextProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
