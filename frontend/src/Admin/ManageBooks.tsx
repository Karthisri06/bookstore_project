import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';


interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

const ManageBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((res) => {
        setBooks(res.data); 
      })
      .catch(() => {
        setError('Failed to load books.');
      });
  }, []);

  const columns: ColumnDef<Book>[] = [
    {
      header: 'ID',
      accessorKey: 'id',  
    },
    {
      header: 'Title',
      accessorKey: 'title', 
    },
    {
      header: 'Author',
      accessorKey: 'author', 
    },
    {
      header: 'Genre',
      accessorKey: 'genre', 
    },
    // {
    //   header: 'Actions',
    //   cell: ({ row }) => (
    //     <div>
    //       <button
    //         className="btn btn-sm btn-primary me-2"
    //         onClick={() => alert(`Edit book: ${row.original.title}`)}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         className="btn btn-sm btn-danger"
    //         onClick={() => alert(`Delete book: ${row.original.title}`)}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];

 
  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={12}>
          <h2 className="mb-4">Manage Books</h2>
          {error && <Alert variant="danger">{error}</Alert>}

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
        </Col>
      </Row>
    </Container>
  );
};

export default ManageBooks;
