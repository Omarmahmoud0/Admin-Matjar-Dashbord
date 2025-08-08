export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  brand: string;
  status: "In Stock" | "Out of Stock";
  createdAt: string;
  updatedAt: string;
}

export const productsData: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    category: "Electronics",
    brand: "TechPro",
    status: "In Stock",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracking with heart rate monitor and GPS capabilities.",
    price: 299.99,
    stock: 23,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    category: "Electronics",
    brand: "FitTech",
    status: "In Stock",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and sustainable cotton t-shirt available in multiple colors.",
    price: 29.99,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
    category: "Clothing",
    brand: "EcoWear",
    status: "Out of Stock",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    stock: 67,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&h=80&fit=crop",
    category: "Home & Garden",
    brand: "HydroLife",
    status: "In Stock",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    description:
      "High-quality 50mm f/1.8 prime lens perfect for portrait photography.",
    price: 399.99,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&h=80&fit=crop",
    category: "Electronics",
    brand: "PhotoPro",
    status: "In Stock",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    description:
      "Non-slip yoga mat made from eco-friendly materials with alignment lines.",
    price: 49.99,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop",
    category: "Sports",
    brand: "ZenFit",
    status: "In Stock",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-21",
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    stock: 89,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop",
    category: "Electronics",
    brand: "ChargeTech",
    status: "In Stock",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-17",
  },
  {
    id: "8",
    name: "Leather Wallet",
    description:
      "Handcrafted genuine leather wallet with RFID protection and multiple card slots.",
    price: 79.99,
    stock: 28,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=80&h=80&fit=crop",
    category: "Accessories",
    brand: "LeatherCraft",
    status: "In Stock",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-20",
  },
  {
    id: "9",
    name: "Smart Home Hub",
    description:
      "Central hub for controlling all your smart home devices with voice commands.",
    price: 149.99,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop",
    category: "Electronics",
    brand: "SmartHome",
    status: "In Stock",
    createdAt: "2024-01-06",
    updatedAt: "2024-01-14",
  },
  {
    id: "10",
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 4 beautiful ceramic coffee mugs perfect for home or office use.",
    price: 34.99,
    stock: 56,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop",
    category: "Home & Garden",
    brand: "KitchenCraft",
    status: "In Stock",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-22",
  },
];
