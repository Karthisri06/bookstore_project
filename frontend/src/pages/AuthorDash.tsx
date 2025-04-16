import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
}

const AuthorDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', description: '', genre: '' });

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/author/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/author/books', newBook, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBook({ title: '', description: '', genre: '' });
      fetchBooks();
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar (optional) */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Author Panel</h2>
        <ul>
          <li className="mb-2"><a href="#" className="hover:underline">Dashboard</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">My Books</a></li>
          {/* Add more nav items if needed */}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Author!</h1>

        {/* List of Books */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">My Books</h2>
          {books.length === 0 ? (
            <p>No books published yet.</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id} className="mb-2 border p-2 rounded">
                  <strong>{book.title}</strong> ({book.genre})<br />
                  <span>{book.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Publish Book */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Publish a New Book</h2>
          <input
            className="block my-1 p-2 border w-full"
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            className="block my-1 p-2 border w-full"
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
          <textarea
            className="block my-1 p-2 border w-full"
            placeholder="Description"
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAddBook}
          >
            Publish Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;


