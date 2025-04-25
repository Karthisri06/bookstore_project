import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

interface User {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
}

interface Purchase {
  id: number;
  user?: User; 
  book?: Book;
  quantity: number;
  address: string;
  priceAtPurchase: number;
  status: string;
  purchasedAt: string;
}

const AllOrders = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get<Purchase[]>('http://localhost:5000/buy/allorder');
        console.log('Fetched Purchases:', response.data); 
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit purchase with ID: ${id}`);
   
  };

  const handleDelete = (id: number) => {
    console.log(`Delete purchase with ID: ${id}`);
 
  };

  const columns = React.useMemo<ColumnDef<Purchase, any>[]>(
    () => [
      {
        header: 'User',
        accessorFn: (row) => row.user?.name || 'N/A',
      },
      {
        header: 'Book',
        accessorFn: (row) => row.book?.title || 'N/A',
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'Price at Purchase',
        accessorKey: 'priceAtPurchase',
        cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Purchased At',
        accessorKey: 'purchasedAt',
        cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
      },
      // {
      //   header: 'Actions',
      //   cell: ({ row }) => (
      //     <div>
      //       <Button variant="warning" onClick={() => handleEdit(row.original.id)}>Edit</Button>{' '}
      //       <Button variant="danger" onClick={() => handleDelete(row.original.id)}>Delete</Button>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  const table = useReactTable({
    data: purchases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container fluid className="py-4">
      <h2>All Orders</h2>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
          <div>Loading orders...</div>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
        </Table>
      )}
    </Container>
  );
};

export default AllOrders;


