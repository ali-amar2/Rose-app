import { useToast } from "@/hooks/use-toast";
import { deleteAccountAction } from "@/lib/actions/account.acctions";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAccount() {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await deleteAccountAction(),
    onSuccess: () => {
      toast({
        title: "Your Account Deleted",
        variant: "success",
      });
    },
    onError: (err) => console.log(err),
  });

  return { mutate, isPending };
}
