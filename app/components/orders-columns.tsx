import { type ColumnDef } from "@tanstack/react-table";
import { type Order } from "../data/orders";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVerticalIcon, EyeIcon } from "@heroicons/react/24/outline";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {order.customerName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {order.customerEmail}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
        ${Number(row.getValue("totalPrice")).toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors = {
        pending:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        processing:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        shipped:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        delivered:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            colors[status as keyof typeof colors]
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as string;
      const labels = {
        credit_card: "Credit Card",
        paypal: "PayPal",
        bank_transfer: "Bank Transfer",
        cash_on_delivery: "Cash on Delivery",
      };
      return (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {labels[method as keyof typeof labels] || method}
        </span>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(row.getValue("orderDate") as string).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const order = row.original;
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
            <DropdownMenuItem onClick={() => alert(`View order: ${order.id}`)}>
              <EyeIcon className="w-4 h-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Print invoice for order: ${order.id}`)}
            >
              Print Invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Send email to: ${order.customerEmail}`)}
            >
              Send Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
