import { useState } from "react";
import { ordersData, type Order } from "../data/orders";
import { DataTable } from "../components/ui/data-table";
import { ordersColumns } from "../components/orders-columns";
import OrderDetailsModal from "../components/OrderDetailsModal";
import HeaderPages from "~/components/HeaderPages";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal and status update logic remains unchanged
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <HeaderPages
        nameHeader="Order Management"
        description="Manage your e-commerce orders"
        isOrderPage={true}
      />
      {/* Order Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center justify-start p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Orders
              </p>
              <p className="md:text-2xl sm:text-xl text-lg font-bold text-gray-900 dark:text-white">
                {orders.length}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="md:text-2xl sm:text-xl text-l font-bold text-gray-900 dark:text-white">
                {orders.filter((order) => order.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Delivered
              </p>
              <p className="md:text-2xl sm:text-xl text-l font-bold text-gray-900 dark:text-white">
                {orders.filter((order) => order.status === "delivered").length}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Cancelled
              </p>
              <p className="md:text-2xl sm:text-xl text-l font-bold text-gray-900 dark:text-white">
                {orders.filter((order) => order.status === "cancelled").length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={ordersColumns}
          data={orders}
          filterColumn="customerName"
          filterPlaceholder="Search orders..."
        />
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
// Refactored to use Shadcn DataTable. Layout is now fully responsive.
