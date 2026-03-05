"use client";

import { useToast } from "@/hooks/use-toast";
import { createCategoryAction } from "@/lib/actions/add-category.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { name: string; image: File }) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);

      return await createCategoryAction(formData);
    },

    onSuccess: (data: {
      success: boolean;
      message: string;
      document?: any;
    }) => {
      toast({
        description: data.message,
      });
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },

    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to add category. Please try again.",
        variant: "destructive",
      });
      console.error("Create category error:", error);
    },
  });
}
