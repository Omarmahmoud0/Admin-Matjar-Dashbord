import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Order } from "../data/orders";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate?: (orderId: string, newStatus: Order["status"]) => void;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusUpdate,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
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
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      credit_card: "Credit Card",
      paypal: "PayPal",
      bank_transfer: "Bank Transfer",
      cash_on_delivery: "Cash on Delivery",
    };
    return labels[method as keyof typeof labels] || method;
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusUpdate) {
      onStatusUpdate(order.id, e.target.value as Order["status"]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Details - {order.id}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Customer
                    </h3>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Amount
                    </h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.items.length} items
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                      {onStatusUpdate && (
                        <select
                          value={order.status}
                          onChange={handleStatusChange}
                          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              item.productName
                            )}&background=random&size=64`;
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ${(item.price / item.quantity).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Shipping Address
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {order.shippingAddress.street}
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {order.shippingAddress.country}
                      </p>
                    </div>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Estimated delivery:{" "}
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Method: {getPaymentMethodLabel(order.paymentMethod)}
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        Total: ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
