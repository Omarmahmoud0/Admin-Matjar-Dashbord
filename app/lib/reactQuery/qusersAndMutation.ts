import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToDoc,
  clearCart,
  deleteFromDoc,
  getAllProducts,
  getOrdersCustomer,
  getProductByID,
  Login,
  LogOut,
  searchForProducts,
  updateProductCartQty,
} from "../firebase/api";
import type { AddDoc, AuthForm } from "~/types/types";

export function useLogInUser() {
  return useMutation({
    mutationFn: (user: AuthForm) => Login(user),
  });
}

export function useLogOutUser() {
  return useMutation({
    mutationFn: () => LogOut(),
    onSuccess: () => {
      window.location.reload();
    },
  });
}

export function useGetAllProducts(
  products:
    | {
        id: string;
      }[]
    | undefined
) {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: () => getAllProducts(),
    initialData: products,
  });
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ["GetProduct", id],
    queryFn: () => getProductByID(id),
    enabled: !!id,
  });
}

export function useAddToDoc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: AddDoc) => addToDoc(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetFavoriteProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}

export function useDeleteFromDoc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, Collection }: { id: string; Collection: string }) =>
      deleteFromDoc(id, Collection),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetFavoriteProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetAddress"],
      });
    },
  });
}

export function useUpdateProductCartQty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: { id: string; qty: number }) =>
      updateProductCartQty(product.id, product.qty),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}

export function useSearchForProducts(search: string) {
  return useQuery({
    queryKey: ["searchForProducts", search],
    queryFn: () => searchForProducts(search),
    enabled: !!search,
  });
}

// Stripe functions //

export function useGetOrdersCustomer(customerId: string) {
  return useQuery({
    queryKey: ["OrdersCustomer", customerId],
    queryFn: () => getOrdersCustomer(customerId),
    enabled: !!customerId,
  });
}

// Stripe functions //

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prodcutId: string[]) => clearCart(prodcutId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["OrdersCustomer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });
}
