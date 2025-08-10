import { useState, useRef } from "react";
import { productsData, type Product } from "../data/products";
import { DataTable, type DataTableRef } from "../components/ui/data-table";
import { productsColumns } from "../components/products-columns";
import HeaderPages from "~/components/HeaderPages";
import SelectionManagementBar from "~/components/SelectionManagementBar";
import { useGetAllProducts } from "~/lib/reactQuery/qusersAndMutation";
import { getAllProducts } from "~/lib/firebase/api";
import type { Route } from "./+types/products";
import { useNavigate } from "react-router";

export async function loader() {
  const products = await getAllProducts();
  return { products };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { data: Products } = useGetAllProducts(loaderData.products);

  const [products, setProducts] = useState<Product[]>(productsData);
  // Modal state removed in favor of route-based forms
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const dataTableRef = useRef<DataTableRef>(null);
  const navigate = useNavigate();

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
        onChangeFunction={() => {
          navigate("/products/add");
        }}
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
          data={Products ?? []}
          filterColumn="name"
          filterPlaceholder="Search products..."
          onSelectionChange={handleSelectionChange}
        />
      </div>
      {/* Modal replaced by route-based add/edit */}
    </div>
  );
}
// Refactored to use Shadcn DataTable. Layout is now fully responsive.
