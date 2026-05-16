import React from "react";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { useFormatter } from "next-intl";
import { Testimonial } from "@/lib/types/testimonial";

export default function TestimonialCard({
  user,
  rating,
  content,
  updatedAt,
}: Testimonial) {
  const format = useFormatter();

  return (
    <Card className="w-full max-w-sm sm:max-w-md bg-transparent border-none shadow-none flex items-end justify-center">
      <CardContent className="w-full bg-white dark:bg-zinc-900 rounded-3xl flex flex-col items-center justify-between px-5 pt-16 pb-5 gap-6 relative">
        <Image
          src={user.photo}
          alt="user"
          width={96}
          height={96}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-24 h-24 rounded-full object-cover border-4 border-white"
        />

        <CardTitle className="text-center font-semibold text-sm sm:text-base">
          {user.firstName} {user.lastName}
        </CardTitle>

        <CardDescription className="text-center text-zinc-700 dark:text-zinc-300 space-y-2">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-zinc-300"
                )}
              />
            ))}
          </div>

          <p className="text-sm line-clamp-3">{content}</p>
        </CardDescription>

        <CardFooter className="text-xs text-zinc-400">
          {format.dateTime(new Date(updatedAt), { dateStyle: "medium" })}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
