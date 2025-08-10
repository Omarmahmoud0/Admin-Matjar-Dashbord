import { redirect, useNavigate, useSubmit } from "react-router";
import HeaderPages from "~/components/HeaderPages";
import ProductForm from "~/components/ProductForm";
import type { AddDoc } from "~/types/types";
import type { Route } from "./+types/PageAddProduct";
import { useAddToDoc } from "~/lib/reactQuery/qusersAndMutation";

export default function AddProductRoute() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const { mutateAsync: addProduct } = useAddToDoc();

  const handleProducts = (product: AddDoc) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("details", product.details);
    formData.append("imageUrl", product.imageUrl);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("color", product.color);
    formData.append("price", product.price.toString());
    // formData.append("specifications", product.specifications);
    formData.append("status", product.status);
    formData.append("stock", product.stock.toString());

    submit(formData, { method: "POST" });
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <HeaderPages
        nameHeader="Add New Product"
        description=""
        isOrderPage={false}
        button="Back"
        onChangeFunction={() => navigate(-1)}
      />
      <ProductForm
        mode="add"
        onSubmitProduct={async (product) => {
          try {
            await addProduct(product);
            navigate("/products");
          } catch (error) {
            console.log(error);
          }
        }}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
