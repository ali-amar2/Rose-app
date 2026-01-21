import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "../ui/toaster";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children, messages }: { children: React.ReactNode, messages: any }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider messages={messages}>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
