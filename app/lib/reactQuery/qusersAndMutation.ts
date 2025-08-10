import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToDoc,
  deleteFromDoc,
  getAllProducts,
  getOrdersCustomer,
  updateProduct,
  Login,
  LogOut,
  searchForProducts,
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
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; product: AddDoc }) =>
      updateProduct(payload.id, payload.product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["GetProduct"] });
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
