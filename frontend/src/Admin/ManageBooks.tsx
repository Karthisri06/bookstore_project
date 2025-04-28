

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { Container, Row, Col, Card, Alert, Form, Button } from 'react-bootstrap';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

const fuzzyFilter: FilterFn<Book> = (row, columnId, value) => {
  return String(row.getValue(columnId)).toLowerCase().includes(String(value).toLowerCase());
};

const ManageBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/books')
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
      enableSorting: true,
    },
    {
      header: 'Title',
      accessorKey: 'title',
      enableSorting: true,
      filterFn: fuzzyFilter,
    },
    {
      header: 'Author',
      accessorKey: 'author',
      enableSorting: true,
      filterFn: fuzzyFilter,
    },
    {
      header: 'Genre',
      accessorKey: 'genre',
      enableSorting: true,
      filterFn: fuzzyFilter,
    },
  ];

  const table = useReactTable({
    data: books,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={12}>
          <h2 className="mb-4">Manage Books</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Filter Inputs */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Filter by Title"
                value={(columnFilters.find((f) => f.id === 'title')?.value as string) || ''}
                onChange={(e) =>
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== 'title'),
                    ...(e.target.value ? [{ id: 'title', value: e.target.value }] : []),
                  ])
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Filter by Author"
                value={(columnFilters.find((f) => f.id === 'author')?.value as string) || ''}
                onChange={(e) =>
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== 'author'),
                    ...(e.target.value ? [{ id: 'author', value: e.target.value }] : []),
                  ])
                }
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={(columnFilters.find((f) => f.id === 'genre')?.value as string) || ''}
                onChange={(e) =>
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== 'genre'),
                    ...(e.target.value ? [{ id: 'genre', value: e.target.value }] : []),
                  ])
                }
              >
                <option value="">All Genres</option>
                {[...new Set(books.map((book) => book.genre))].map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Book Table */}
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' ',
                        desc: ' ',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="secondary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="me-2"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
            <span>
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageBooks;

