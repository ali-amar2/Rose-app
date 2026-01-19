"use client";

import { Toaster } from "../ui/toaster";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster />
    </ReactQueryProvider>
  );
}
