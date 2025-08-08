import { useState, useRef } from "react";
import { usersData, type User } from "../data/users";
import { DataTable, type DataTableRef } from "../components/ui/data-table";
import { usersColumns } from "../components/users-columns";
import HeaderPages from "~/components/HeaderPages";
import SelectionManagementBar from "~/components/SelectionManagementBar";

export default function Users() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const dataTableRef = useRef<DataTableRef>(null);

  const handleDeleteUsers = (usersToDelete: User[]) => {
    const userIdsToDelete = usersToDelete.map(user => user.id);
    setUsers(users.filter(user => !userIdsToDelete.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleCancelSelection = () => {
    setSelectedUsers([]);
    dataTableRef.current?.clearSelection();
  };

  const handleSelectionChange = (selectedRows: User[]) => {
    setSelectedUsers(selectedRows);
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-5 py-4">
      <HeaderPages
        nameHeader="User Management"
        description="Manage your e-commerce users"
        isOrderPage={false}
        button="Add New User"
      />
      
      {/* Selection Management Bar */}
      <SelectionManagementBar
        selectedItems={selectedUsers}
        onDelete={handleDeleteUsers}
        onCancel={handleCancelSelection}
        itemType="users"
      />
      
      <div className="overflow-x-auto">
        <DataTable
          ref={dataTableRef}
          columns={usersColumns}
          data={users}
          filterColumn="name"
          filterPlaceholder="Search users..."
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}
// Refactored to use Shadcn DataTable. Layout is now fully responsive.
