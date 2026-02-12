"use client";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/lib/actions/account.acctions";
import { UpdateProfileField } from "@/lib/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (field: UpdateProfileField) =>
      await updateProfileAction(field),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Your Data Update successfully",
        variant: "success",
      });
    },
    onError: (err) => console.log(err),
  });

  return { mutate, isPending };
}
