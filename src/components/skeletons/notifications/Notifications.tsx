"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BrushCleaning,
  CheckCheck,
  Check,
  Trash2,
  EllipsisVertical,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Notifications() {
  // Mock API
  // simulate fetching notifications from an APIc with delay

  const PAGE_SIZE = 5;

  const fetchNotifications = async ({ pageParam = 0 }) => {
    await new Promise((res) => setTimeout(res, 500));

    const allNotifications = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      title: "Your Order Has Been Shipped",
      description:
        "Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery...",
      isRead: index % 3 === 0,
    }));

    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return {
      data: allNotifications.slice(start, end),
      nextPage: end < allNotifications.length ? pageParam + 1 : undefined,
    };
  };

  // start infinite query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: fetchNotifications,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

  const unreadNotifications = notifications.filter(
    (item) => !item.isRead
  ).length;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const reachedBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (reachedBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // TODO: handle clear all notification function

  function clearAllNotifications() {
    console.log("clear all notifications");
  }

  // TODO: handle mark all as read function

  function markAllAsRead() {
    console.log("mark all as read");
  }

  // Todo: Mark single notification as read function

  function markAsRead(id: number) {
    console.log(`mark notification ${id} as read`);
  }

  // Todo: delete single notification

  function deleteSingleNotifcation(id: number) {
    console.log(`delete notification ${id}`);
  }

  return (
    // dropdown menu
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/*  icon button */}
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-xl p-0 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Bell size={22} className="text-zinc-700 dark:text-zinc-50" />

          <span className="absolute -end-0 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
            {unreadNotifications}
          </span>
        </Button>
      </DropdownMenuTrigger>

      {/* start menu content */}
      <DropdownMenuContent
        align="end"
        onScroll={handleScroll}
        className="hide-scrollbar max-h-[32rem] w-[22rem] overflow-y-auto rounded-2xl border border-zinc-200 p-0 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        {/* Header */}
        <DropdownMenuLabel className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-maroon-700 p-4 text-white dark:border-zinc-700 dark:bg-maroon-700">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Notifications</span>

            <span className="text-xs font-normal text-white/80">
              {notifications.length} notifications
            </span>
          </div>

          <div className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-2 text-xs font-semibold">
            {unreadNotifications}
          </div>
        </DropdownMenuLabel>

        {/* menu items */}
        <DropdownMenuGroup className="border-b border-zinc-200 dark:border-zinc-800">
          <DropdownMenuItem className="rounded-none px-4 py-3 focus:bg-zinc-100 dark:focus:bg-zinc-800">
            <div className="flex w-full items-center justify-between gap-3">
              <button
                onClick={clearAllNotifications}
                className="flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-red-500 dark:text-zinc-200"
              >
                <BrushCleaning size={17} className="text-zinc-500" />

                <span>Clear all</span>
              </button>

              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-maroon-700 dark:text-zinc-200"
              >
                <CheckCheck size={17} className="text-zinc-500" />

                <span>Mark all read</span>
              </button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* display Notifications data dynamic */}
        <div className="flex flex-col">
          {notifications.map((item) => (
            <div key={item.id}>
              <DropdownMenuGroup
                className={`relative px-4 py-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                  !item.isRead
                    ? "bg-zinc-100/80 dark:bg-zinc-900"
                    : "bg-white dark:bg-zinc-950"
                }`}
              >
                {!item.isRead && (
                  <span className="absolute end-4 top-4 h-2.5 w-2.5 rounded-full bg-maroon-700" />
                )}

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-lg px-0 py-0 focus:bg-transparent data-[state=open]:bg-transparent">
                    <div className="flex w-full items-start justify-between gap-4">
                      <div className="flex flex-col gap-1 pe-4">
                        <h5 className="line-clamp-1 text-sm font-semibold capitalize text-zinc-800 dark:text-zinc-50">
                          {item.title}
                        </h5>

                        <p className="line-clamp-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800">
                        <EllipsisVertical
                          size={16}
                          className="text-zinc-500 dark:text-zinc-400"
                        />
                      </div>
                    </div>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-52 rounded-xl border border-zinc-200 p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                      <DropdownMenuItem
                        onClick={() => markAsRead(item.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 focus:bg-zinc-100 dark:focus:bg-zinc-800"
                      >
                        <Check size={16} className="text-maroon-700" />

                        <span className="text-sm font-medium">
                          Mark as read
                        </span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => deleteSingleNotifcation(item.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 focus:bg-zinc-100 dark:focus:bg-zinc-800"
                      >
                        <Trash2 size={16} className="text-red-500" />

                        <span className="text-sm font-medium text-red-500">
                          Delete notification
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Loading */}
        {isFetchingNextPage && (
          <div className="p-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Loading more...
          </div>
        )}

        {/* No more data */}
        {!hasNextPage && notifications.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-3 border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <BellOff size={42} className="text-zinc-400 dark:text-zinc-500" />

            <span className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              No more notifications
            </span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
