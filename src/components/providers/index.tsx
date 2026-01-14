import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
