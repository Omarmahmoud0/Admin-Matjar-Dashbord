import { useNavigate, useParams } from "react-router";
import ProductForm from "~/components/ProductForm";
import { getProductByID, updateProduct } from "~/lib/firebase/api";
import type { Route } from "./+types/PageUpdateProduct";
import HeaderPages from "~/components/HeaderPages";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductByID(params.id!);
  return { product };
}

export default function EditProductRoute({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <HeaderPages
        nameHeader="Update Product"
        description=""
        isOrderPage={false}
        button="Back"
        onChangeFunction={() => navigate(-1)}
      />
      <ProductForm
        mode="edit"
        initialProduct={loaderData?.product}
        onSubmitProduct={async (product) => {
          await updateProduct(params.id!, product);
          navigate("/products");
        }}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
