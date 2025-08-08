import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Check, Trash2, X } from "lucide-react";

interface SelectionManagementBarProps {
  selectedItems: any[];
  onDelete: (items: any[]) => void;
  onCancel: () => void;
  itemType: "users" | "products";
}

export default function SelectionManagementBar({
  selectedItems,
  onDelete,
  onCancel,
  itemType,
}: SelectionManagementBarProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedItems);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const itemTypeLabel = itemType === "users" ? "users" : "products";
  const itemTypeLabelSingular = itemType === "users" ? "user" : "product";

  return (
    <>
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <>
            {/* Responsive Spacer */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "var(--spacer-height)" }}
              exit={{ height: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
              }}
              className="w-full [--spacer-height:64px] sm:[--spacer-height:72px] lg:[--spacer-height:80px]"
            />

            {/* Ultra Modern Responsive Selection Bar */}
            <motion.div
              initial={{ y: -120, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -120, opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
              }}
              className="fixed top-0 left-0 right-0 z-50"
            >
              {/* Responsive Backdrop blur container */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/95 to-white/85 dark:from-gray-900/85 dark:via-gray-900/95 dark:to-gray-900/85 backdrop-blur-xl" />

              {/* Subtle top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-gray-600/60" />

              {/* Main responsive content */}
              <div className="relative">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
                  <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                    {/* Left side - Responsive Selection info */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5 min-w-0 flex-1"
                    >
                      <div className="relative group flex-shrink-0">
                        {/* Responsive selection badge */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl lg:shadow-2xl shadow-purple-500/20 sm:shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <motion.span
                            key={selectedItems.length}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-sm sm:text-base lg:text-lg font-bold text-white"
                          >
                            {selectedItems.length}
                          </motion.span>

                          {/* Animated ring */}
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/20 sm:border-2 group-hover:border-white/40 transition-all duration-300" />

                          {/* Pulse effect */}
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 animate-pulse" />
                        </div>

                        {/* Responsive status indicator */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 sm:border-3 border-white dark:border-gray-900 shadow-md sm:shadow-lg flex items-center justify-center"
                        >
                          <Check
                            className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white"
                            strokeWidth={3}
                          />
                        </motion.div>
                      </div>

                      {/* Responsive text content */}
                      <div className="flex flex-col space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="flex items-baseline space-x-1 sm:space-x-2"
                        >
                          <span className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent truncate">
                            {selectedItems.length}{" "}
                            {selectedItems.length === 1
                              ? itemTypeLabelSingular
                              : itemTypeLabel}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 flex-shrink-0">
                            selected
                          </span>
                        </motion.div>
                        <motion.span
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block"
                        >
                          Choose an action to continue
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Right side - Responsive Actions */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0"
                    >
                      {/* Mobile: Compact buttons */}
                      <div className="flex sm:hidden items-center space-x-2">
                        {/* Mobile Delete Button - Icon only */}
                        <Button
                          onClick={handleDeleteClick}
                          size="sm"
                          className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 rounded-lg w-10 h-10 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* Mobile Cancel Button - Icon only */}
                        <Button
                          onClick={onCancel}
                          size="sm"
                          className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 border border-gray-200/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg w-10 h-10 p-0 backdrop-blur-sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Tablet and Desktop: Full buttons */}
                      <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
                        {/* Delete Button */}
                        <Button
                          onClick={handleDeleteClick}
                          className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0 shadow-lg sm:shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 h-9 sm:h-10 lg:h-12 text-sm sm:text-base font-semibold"
                        >
                          {/* Button background animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                          <div className="relative flex items-center space-x-1.5 sm:space-x-2 lg:space-x-2.5">
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="hidden sm:inline">Delete</span>
                          </div>
                        </Button>

                        {/* Cancel Button */}
                        <Button
                          onClick={onCancel}
                          className="group relative overflow-hidden bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 text-gray-700 dark:text-gray-300 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 h-9 sm:h-10 lg:h-12 text-sm sm:text-base font-semibold backdrop-blur-sm"
                        >
                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                          <div className="relative flex items-center space-x-1.5 sm:space-x-2 lg:space-x-2.5">
                            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="hidden sm:inline">Cancel</span>
                          </div>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Bottom subtle shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/40 to-transparent dark:via-gray-700/40" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen}>
        <AlertDialogContent
          className=" w-[95vw] max-w-md  mx-auto  rounded-lg  p-0 sm:w-full sm:max-w-lg
        "
        >
          <AlertDialogHeader
            className=" p-4  pb-2 sm:p-6  sm:pb-4
          "
          >
            <AlertDialogTitle
              className=" text-lg  font-semibold  leading-tight sm:text-xl sm:leading-normal
            "
            >
              Delete {itemTypeLabel}
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" text-sm  text-muted-foreground  mt-2 leading-relaxed sm:text-base sm:mt-3
            "
            >
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {selectedItems.length}
              </span>{" "}
              {selectedItems.length === 1
                ? itemTypeLabelSingular
                : itemTypeLabel}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter
            className=" flex  flex-col-reverse  gap-2  p-4  pt-2 sm:flex-row  sm:gap-3  sm:p-6  sm:pt-4
          "
          >
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              className=" w-full  h-10 text-sm sm:w-auto  sm:h-9 sm:text-sm
              "
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className=" w-full  h-10 text-sm bg-red-600  hover:bg-red-700  focus:ring-red-600 sm:w-auto  sm:h-9 sm:text-sm
              "
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
