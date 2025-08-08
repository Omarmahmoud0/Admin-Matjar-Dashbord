import { useState, useRef } from "react";
import { productsData, type Product } from "../data/products";
import { DataTable, type DataTableRef } from "../components/ui/data-table";
import { productsColumns } from "../components/products-columns";
import ProductModal from "../components/ProductModal";
import HeaderPages from "~/components/HeaderPages";
import SelectionManagementBar from "~/components/SelectionManagementBar";
import { useGetAllProducts } from "~/lib/reactQuery/qusersAndMutation";
import { getAllProducts } from "~/lib/firebase/api";
import type { Route } from "./+types/products";
import type { AddDoc } from "~/types/types";
import { useSubmit } from "react-router";

export async function loader() {
  const products = await getAllProducts();
  return { products };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { data: Products } = useGetAllProducts(loaderData.products);

  const [products, setProducts] = useState<Product[]>(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const dataTableRef = useRef<DataTableRef>(null);
  const submit = useSubmit();

  const handleOpenModel = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleProducts = (product: AddDoc) => {
    const formData = new FormData();
    formData.append("name", product.name);
    submit(product, { method: "POST" });
  };

  const handleDeleteProducts = (productsToDelete: Product[]) => {
    const productIdsToDelete = productsToDelete.map((product) => product.id);
    setProducts(
      products.filter((product) => !productIdsToDelete.includes(product.id))
    );
    setSelectedProducts([]);
  };

  const handleCancelSelection = () => {
    setSelectedProducts([]);
    dataTableRef.current?.clearSelection();
  };

  const handleSelectionChange = (selectedRows: Product[]) => {
    setSelectedProducts(selectedRows);
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <HeaderPages
        nameHeader="Product Management"
        description="Manage your e-commerce products"
        isOrderPage={false}
        button="Add New Product"
        onChangeFunction={handleOpenModel}
      />

      {/* Selection Management Bar */}
      <SelectionManagementBar
        selectedItems={selectedProducts}
        onDelete={handleDeleteProducts}
        onCancel={handleCancelSelection}
        itemType="products"
      />

      <div className="overflow-x-auto">
        <DataTable
          ref={dataTableRef}
          columns={productsColumns}
          data={loaderData.products ?? []}
          filterColumn="name"
          filterPlaceholder="Search products..."
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleProducts}
      />
    </div>
  );
}
// Refactored to use Shadcn DataTable. Layout is now fully responsive.

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  return null;
}
