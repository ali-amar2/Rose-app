import * as React from "react";

import { cn } from "@/lib/utils/tailwind-merge";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          " dark:bg-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-700 dark:focus:border-softPink-300 flex h-12 w-full text-zinc-800 outline-none rounded-lg border border-zinc-300 hover:border-zinc-400 focus:border-maroon-600  bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none  disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:border-none md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
