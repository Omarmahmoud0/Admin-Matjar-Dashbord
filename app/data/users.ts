export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  registrationDate: string;
  lastLogin: string;
  avatar?: string;
}

export const usersData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'customer',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-01-20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
    status: 'active',
    registrationDate: '2023-12-01',
    lastLogin: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'customer',
    status: 'inactive',
    registrationDate: '2023-11-20',
    lastLogin: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'moderator',
    status: 'active',
    registrationDate: '2023-10-15',
    lastLogin: '2024-01-19',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'customer',
    status: 'suspended',
    registrationDate: '2023-09-30',
    lastLogin: '2024-01-05',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Diana Davis',
    email: 'diana.davis@example.com',
    role: 'customer',
    status: 'active',
    registrationDate: '2024-01-10',
    lastLogin: '2024-01-22',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Edward Miller',
    email: 'edward.miller@example.com',
    role: 'customer',
    status: 'active',
    registrationDate: '2023-08-25',
    lastLogin: '2024-01-18',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    role: 'moderator',
    status: 'active',
    registrationDate: '2023-07-12',
    lastLogin: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'George Martinez',
    email: 'george.martinez@example.com',
    role: 'customer',
    status: 'inactive',
    registrationDate: '2023-06-08',
    lastLogin: '2024-01-02',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '10',
    name: 'Helen Taylor',
    email: 'helen.taylor@example.com',
    role: 'customer',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-01-23',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
]; 