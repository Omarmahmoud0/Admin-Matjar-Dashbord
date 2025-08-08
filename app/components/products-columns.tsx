import { type ColumnDef } from "@tanstack/react-table";
import { type Product } from "../data/products";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "./ui/checkbox";

export const productsColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-lg mr-3 object-contain aspect-square"
            src={product?.imageUrl[0]}
            alt={product?.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                product?.name
              )}&background=random&size=40`;
            }}
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {product?.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {product?.brand}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <span className="text-sm text-gray-900 dark:text-white">
          {product?.category}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <span className="text-sm font-medium text-gray-900 dark:text-white ">
          ${product?.price?.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const product = 15 as number;
      return (
        <span
          className={`text-sm font-medium  ${
            product === 0
              ? "text-red-600 dark:text-red-400"
              : product < 15
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-green-600 dark:text-green-400"
          }`}
        >
          {product}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = "in_stock";
      const colors = {
        in_stock:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        out_of_stock:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            colors[status as keyof typeof colors]
          }`}
        >
          {status.replace("_", " ")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => alert(`Edit product: ${product.name}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete product: ${product.name}`)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
