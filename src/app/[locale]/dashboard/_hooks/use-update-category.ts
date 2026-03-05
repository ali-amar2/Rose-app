"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { updateCategoryAction } from "@/lib/actions/update-category.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { id: string; name: string }) => {
      return await updateCategoryAction(data.id, data.name);
    },

    onSuccess: (data: {
      success: boolean;
      message: string;
      document?: any;
    }) => {
      toast({
        description: data.message,
      });
      setTimeout(() => {
        router.push("/dashboard/categories");
      }, 2000);
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },

    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to update category. Please try again.",
        variant: "destructive",
      });

      console.error("Update category error:", error);
    },
  });
}
