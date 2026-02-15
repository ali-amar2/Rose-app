"use client";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/lib/actions/account.actions";
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
        title: "Your profile has been updated successfully",
        variant: "success",
      });
    },
    onError: (err) => console.log(err),
  });

  return { mutate, isPending };
}
