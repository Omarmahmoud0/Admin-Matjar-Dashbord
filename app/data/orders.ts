export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export const ordersData: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    totalPrice: 299.99,
    status: 'delivered',
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        quantity: 1,
        price: 199.99,
      },
      {
        id: '2',
        productId: '4',
        productName: 'Stainless Steel Water Bottle',
        productImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&h=80&fit=crop',
        quantity: 2,
        price: 49.98,
      },
    ],
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    totalPrice: 149.50,
    status: 'shipped',
    paymentMethod: 'paypal',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    items: [
      {
        id: '3',
        productId: '6',
        productName: 'Yoga Mat Premium',
        productImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop',
        quantity: 1,
        price: 49.99,
      },
      {
        id: '4',
        productId: '7',
        productName: 'Wireless Charging Pad',
        productImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop',
        quantity: 2,
        price: 79.98,
      },
    ],
    orderDate: '2024-01-14',
    estimatedDelivery: '2024-01-19',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob.johnson@example.com',
    totalPrice: 89.99,
    status: 'processing',
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
    items: [
      {
        id: '5',
        productId: '8',
        productName: 'Leather Wallet',
        productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=80&h=80&fit=crop',
        quantity: 1,
        price: 79.99,
      },
    ],
    orderDate: '2024-01-13',
    estimatedDelivery: '2024-01-18',
  },
  {
    id: 'ORD-004',
    customerName: 'Alice Brown',
    customerEmail: 'alice.brown@example.com',
    totalPrice: 199.99,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    shippingAddress: {
      street: '321 Elm St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'USA',
    },
    items: [
      {
        id: '6',
        productId: '2',
        productName: 'Smart Fitness Watch',
        productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        quantity: 1,
        price: 199.99,
      },
    ],
    orderDate: '2024-01-12',
    estimatedDelivery: '2024-01-17',
  },
  {
    id: 'ORD-005',
    customerName: 'Charlie Wilson',
    customerEmail: 'charlie.wilson@example.com',
    totalPrice: 399.99,
    status: 'delivered',
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: '654 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA',
    },
    items: [
      {
        id: '7',
        productId: '5',
        productName: 'Professional Camera Lens',
        productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&h=80&fit=crop',
        quantity: 1,
        price: 399.99,
      },
    ],
    orderDate: '2024-01-11',
    estimatedDelivery: '2024-01-16',
    trackingNumber: 'TRK456789123',
  },
  {
    id: 'ORD-006',
    customerName: 'Diana Davis',
    customerEmail: 'diana.davis@example.com',
    totalPrice: 69.98,
    status: 'cancelled',
    paymentMethod: 'paypal',
    shippingAddress: {
      street: '987 Cedar Ln',
      city: 'Philadelphia',
      state: 'PA',
      zipCode: '19101',
      country: 'USA',
    },
    items: [
      {
        id: '8',
        productId: '10',
        productName: 'Ceramic Coffee Mug Set',
        productImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop',
        quantity: 2,
        price: 69.98,
      },
    ],
    orderDate: '2024-01-10',
  },
  {
    id: 'ORD-007',
    customerName: 'Edward Miller',
    customerEmail: 'edward.miller@example.com',
    totalPrice: 149.99,
    status: 'shipped',
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: '147 Birch Rd',
      city: 'San Antonio',
      state: 'TX',
      zipCode: '78201',
      country: 'USA',
    },
    items: [
      {
        id: '9',
        productId: '9',
        productName: 'Smart Home Hub',
        productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
        quantity: 1,
        price: 149.99,
      },
    ],
    orderDate: '2024-01-09',
    estimatedDelivery: '2024-01-14',
    trackingNumber: 'TRK789123456',
  },
  {
    id: 'ORD-008',
    customerName: 'Fiona Garcia',
    customerEmail: 'fiona.garcia@example.com',
    totalPrice: 129.97,
    status: 'processing',
    paymentMethod: 'cash_on_delivery',
    shippingAddress: {
      street: '258 Willow Way',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101',
      country: 'USA',
    },
    items: [
      {
        id: '10',
        productId: '3',
        productName: 'Organic Cotton T-Shirt',
        productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop',
        quantity: 3,
        price: 89.97,
      },
      {
        id: '11',
        productId: '4',
        productName: 'Stainless Steel Water Bottle',
        productImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&h=80&fit=crop',
        quantity: 1,
        price: 24.99,
      },
    ],
    orderDate: '2024-01-08',
    estimatedDelivery: '2024-01-13',
  },
]; 