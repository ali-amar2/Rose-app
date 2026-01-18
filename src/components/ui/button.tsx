<<<<<<< HEAD
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/tailwind-merge"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
=======
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
>>>>>>> 0ead551a702256d11c95d8afd64f650ec068b1f5
  {
    variants: {
      variant: {
        default:
<<<<<<< HEAD
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
=======
          "dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600  bg-maroon-600 text-white shadow hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500",
        secondary:
          "dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 bg-maroon-50 text-maroon-600 shadow-sm hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500",
        destructive:
          "dark:bg-red-500 dark:hover:bg-red-600 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 bg-red-600 text-white shadow-sm hover:bg-red-700 disabled:bg-zinc-300 disabled:text-zinc-500",
        outline:
          "border dark:border-softPink-300 dark:bg-zinc-800 dark:text-softPink-300 dark:hover:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 dark:disabled:bg-zinc-800  border-maroon-600 bg-white text-maroon-600 shadow-sm hover:border-maroon-300 hover:bg-maroon-50 disabled:border-zinc-300 disabled:text-zinc-400 disabled:bg-zinc-100",
        ghost:
          "dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 text-zinc-800 hover:bg-zinc-100 disabled:bg-zinc-100 disabled:text-zinc-400",
        link: "dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 dark:disabled:bg-zinc-800 text-zinc-800 bg-zinc-50 border border-zinc-400 hover:bg-zinc-100 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:border-zinc-300",
      },
      size: {
        default: "h-11 px-4 py-2",
>>>>>>> 0ead551a702256d11c95d8afd64f650ec068b1f5
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
<<<<<<< HEAD
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
=======
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
>>>>>>> 0ead551a702256d11c95d8afd64f650ec068b1f5
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
<<<<<<< HEAD
    const Comp = asChild ? Slot : "button"
=======
    const Comp = asChild ? Slot : "button";
>>>>>>> 0ead551a702256d11c95d8afd64f650ec068b1f5
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
<<<<<<< HEAD
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
=======
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
>>>>>>> 0ead551a702256d11c95d8afd64f650ec068b1f5
