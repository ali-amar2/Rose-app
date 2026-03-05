"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryAction } from "@/lib/actions/delete-category.action";
import { useToast } from "@/hooks/use-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCategoryAction(id);
      return res;
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
        toast({
          description: "Category has been deleted successfully",
        });
      }
    },
  });
}
