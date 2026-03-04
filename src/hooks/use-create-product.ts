import { createProduct } from "@/lib/actions/create-product.action";
import { ProductFields } from "@/lib/types/product";
import { useMutation } from "@tanstack/react-query";

export default function useCreateProduct() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: ProductFields) => {
    
      // handle data 
      const formData = new FormData();
      formData.append("title", String(values.title));
      formData.append("description", String(values.description));
      formData.append("price", String(values.price));
      formData.append("quantity", String(values.quantity));
      formData.append("category", String(values.category));
      formData.append("occasion", String(values.occasion));
      // calculate price after disccount
      if (values.discount) {
        formData.append("discount", String(values.discount));
        formData.append(
          "priceAfterDiscount",
          String(values.price - values.discount)
        );
      }
      // handle one image 
      if (values.imageCover) {
        formData.append("imgCover", values.imageCover);
      }
      // handle one or more images 
      if (values.gallery && values.gallery.length > 0) {
        values.gallery.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      const response = await createProduct(formData);

      if (response?.error) {
        throw new Error(response?.error || "Created failed");
      }

      return response;
    },
  });

  return { createProduct: mutate, error, isPending };
}
