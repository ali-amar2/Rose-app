"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { ReactNode } from "react";

// types
interface DeleteAlertProps {
  itemType: string;
  triggerButton?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  isLoading?: boolean;
}

export function DeleteAlert({
  itemType = "item",
  triggerButton,
  onConfirm,
  isLoading = false,
}: DeleteAlertProps) {
  return (
    <Dialog>
      <form>
        {/* dialog button */}
        <DialogTrigger asChild>
          {triggerButton || <Button variant="outline">delete</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          {/* dialog header and icon */}
          <DialogHeader>
            <div className="w-28 h-28 rounded-full bg-alertColor/5 mx-auto flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-alertColor/15 flex items-center justify-center">
                <Trash />
              </div>
            </div>
          </DialogHeader>
          {/* dialog description */}
          <DialogDescription>
            <p className="text-center text-zinc-800">
              Are you sure you want to delete this {itemType}?
            </p>
          </DialogDescription>

          {/* dialog buttons */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
