import { updateProduct } from "@/lib/actions/update-product.action";
import { ProductUpdateFields } from "@/lib/types/product";
import { useMutation } from "@tanstack/react-query";

type ProductMutationInput = ProductUpdateFields & { productId: string };

export default function useUpdateProduct() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (fields: ProductMutationInput) => {
      const { productId, ...values } = fields;
      // handle data
      const formData = new FormData();
      formData.append("title", String(values.title));
      formData.append("description", String(values.description));
      formData.append("price", String(values.price));
      formData.append("quantity", String(values.quantity));
      formData.append("category", String(values.category));
      if (values.discount) {
        formData.append(
          "priceAfterDiscount",
          String(values.price - values.discount)
        );
      }

      const response = await updateProduct(formData, productId);

      if (response?.error) {
        throw new Error(response?.error || "Updated failed");
      }

      return response;
    },
  });

  return { updateProduct: mutate, error, isPending };
}
