import { type ColumnDef } from "@tanstack/react-table";
import { type User } from "../data/users";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "./ui/checkbox";

export const usersColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-3"
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=random`
            }
            alt={user.name}
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const colors = {
        admin:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        moderator:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        customer:
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            colors[role as keyof typeof colors]
          }`}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors = {
        active:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        inactive:
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            colors[status as keyof typeof colors]
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
    cell: ({ row }) =>
      new Date(row.getValue("registrationDate") as string).toLocaleDateString(),
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) =>
      new Date(row.getValue("lastLogin") as string).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem onClick={() => alert(`Edit user: ${user.name}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Delete user: ${user.name}`)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(`Toggle status for: ${user.name}`)}
            >
              {user.status === "active" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
