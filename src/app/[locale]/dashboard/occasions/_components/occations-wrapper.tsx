"use client";

import { useEffect, useState } from "react";
import OccasionsHeader from "./occasions-header";
import OccasionsList from "./occasions-list";

export default function OccationsWrapper() {
  // local input state used for debouncing
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  // debounce search term so queries don't fire on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);
  return (
    <>
      <OccasionsHeader search={input} onSearchChange={setInput} />
      <OccasionsList search={search} />
    </>
  );
}
