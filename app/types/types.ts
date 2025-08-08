export interface ProductCardProps {
  id: string;
  name: string;
  details: string;
  price: number;
  imageUrl: string;
  rating: number;
  button?: boolean;
  userId: string;
}

export interface AuthForm {
  email: string;
  password: string;
  confirmpassword?: string;
  name?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface AddDoc {
  name: string;
  details?: string;
  imageUrl: string;
  specifications: { value: string }[];
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: "In Stock" | "Out of Stock";
  color: string;
}

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
  category: string;
  brand: string;
  status: "In Stock" | "Out of Stock";
  specifications: { value: string }[];
  color: string;
};
