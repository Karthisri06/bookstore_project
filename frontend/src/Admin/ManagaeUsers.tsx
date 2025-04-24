import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface User {
  id: number;
  email: string;
  role: string;
  userName:string
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/alluser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data, '6rdsduiohg')
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchAllUsers();
  }, []);

  
  const handleEdit = (user: User) => {
    alert(`Edit user: ${user.userName}`);
   
  };

  
  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/auth/deleteuser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

 
  const columns: ColumnDef<User>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'userName',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(row.original)}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.original.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Users</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

