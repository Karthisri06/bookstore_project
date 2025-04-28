// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Card, Form, Col, Row, Alert, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// interface Book {
//   id: number;
//   title: string;
//   description: string;
//   genre: string;
//   price: number;
//   imageUrl: string;
// }

// const AuthorDashboard: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [newBook, setNewBook] = useState({
//     title: '',
//     description: '',
//     genre: 'Fiction',
//     price: 0,
//     imageUrl: '',
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [activeSection, setActiveSection] = useState<string>('Home');
//   const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
//   const navigate = useNavigate();

//   const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi'];

//   const fetchBooks = async () => {
//     setIsFetching(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/');
//         return;
//       }
//       const userName = localStorage.getItem('userName');
//       const res = await axios.get(`http://localhost:5000/author/my-books/${userName}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBooks(res.data);
//     } catch (err) {
//       setError('Error fetching books');
//       console.error('Error fetching books:', err);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleAddBook = async () => {
//     if (!newBook.title || !newBook.description || newBook.price <= 0) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }
//       const userName = localStorage.getItem('userName');

//       await axios.post(`http://localhost:5000/author/publish/${userName}`, newBook, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewBook({ title: '', description: '', genre: 'Fiction', price: 0, imageUrl: '' });
//       fetchBooks();
//       setSuccess('Book published successfully!');
//     } catch (err) {
//       setError('Error adding book');
//       console.error('Error adding book:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleViewReviews = (bookId: number) => {
//     // Navigate to a page where the author can see the reviews
//     navigate(`/book-reviews/${bookId}`);
//   };

//   const handleEditBook = (bookId: number) => {
//     // Navigate to an edit page for the book
//     navigate(`/edit-book/${bookId}`);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 bg-dark text-white p-4">
//           <h2 className="h4">Author Dashboard</h2>
//           <ul className="list-unstyled">
//             {['Home', 'My Books'].map((section) => (
//               <li key={section}>
//                 <button
//                   className={`btn btn-link text-white text-start w-100 ${activeSection === section ? 'fw-bold' : ''}`}
//                   onClick={() => setActiveSection(section)}
//                 >
//                   {section}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 p-4">
//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}

//           {activeSection === 'Home' && (
//             <>
//               <h1 className="mb-4">Welcome, Author!</h1>
//               <p>This is your author dashboard. Use the sidebar to manage your books, reviews, and notifications.</p>
//             </>
//           )}

//           {activeSection === 'My Books' && (
//             <>
//               <div className="mb-4">
//                 <h2 className="h5">My Books</h2>
//                 {isFetching ? (
//                   <Spinner animation="border" variant="primary" />
//                 ) : books.length === 0 ? (
//                   <p>No books published yet.</p>
//                 ) : (
//                   <Row>
//                     {books.map((book) => (
//                       <Col key={book.id} md={4} className="mb-3">
//                         <Card
//                           className="book-card"
//                           style={{ cursor: 'pointer' }}
//                           onClick={() => setSelectedBookId(book.id)} // Add interaction for card click
//                         >
//                           {book.imageUrl && (
//                             <Card.Img variant="top" src={book.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
//                           )}
//                           <Card.Body>
//                             <Card.Title>{book.title}</Card.Title>
//                             <Card.Text>{book.description}</Card.Text>
//                             <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
//                             <Card.Text><strong>Price:</strong> ₹{book.price}</Card.Text>
//                             {/* Add View Reviews and Edit buttons */}
//                             <Button variant="primary" onClick={() => handleViewReviews(book.id)}>
//                               View Reviews
//                             </Button>
//                             <Button variant="warning" onClick={() => handleEditBook(book.id)} className="ms-2">
//                               Edit Book
//                             </Button>
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 )}
//               </div>

//               <div className="border-top pt-4">
//                 <h2 className="h5 mb-3">Publish a New Book</h2>
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter book title"
//                       value={newBook.title}
//                       onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       placeholder="Enter book description"
//                       value={newBook.description}
//                       onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control
//                       type="number"
//                       placeholder="Enter book price"
//                       value={newBook.price}
//                       onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Genre</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={newBook.genre}
//                       onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
//                     >
//                       {genres.map((genre, index) => (
//                         <option key={index} value={genre}>{genre}</option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Image URL</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter image URL"
//                       value={newBook.imageUrl}
//                       onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
//                     />
//                   </Form.Group>

//                   <Button variant="primary" onClick={handleAddBook} disabled={isLoading}>
//                     {isLoading ? 'Publishing...' : 'Publish Book'}
//                   </Button>
//                 </Form>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthorDashboard;


// Edit and review button

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Card, Form, Col, Row, Alert, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// interface Book {
//   id: number;
//   title: string;
//   description: string;
//   genre: string;
//   price: number;
//   imageUrl: string;
// }

// const AuthorDashboard: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [newBook, setNewBook] = useState({
//     title: '',
//     description: '',
//     genre: 'Fiction',
//     price: 0,
//     imageUrl: '',
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [activeSection, setActiveSection] = useState<string>('Home'); // NEW
//   const navigate = useNavigate();

//   const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi'];

//   const fetchBooks = async () => {
//     setIsFetching(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/');
//         return;
//       }
//       const userName = localStorage.getItem('userName');
//       const res = await axios.get(`http://localhost:5000/author/my-books/${userName}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBooks(res.data);
//     } catch (err) {
//       setError('Error fetching books');
//       console.error('Error fetching books:', err);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, bookId: number) => {
//     const { name, value } = e.target;
//     setBooks((prevBooks) =>
//       prevBooks.map((book) =>
//         book.id === bookId ? { ...book, [name]: value } : book
//       )
//     );
//   };

//   const handleEditBook = async (bookId: number) => {
//     const bookToUpdate = books.find((book) => book.id === bookId);
//     if (!bookToUpdate) return;

//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       await axios.put(`http://localhost:5000/books/${bookId}`, bookToUpdate, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess('Book updated successfully!');
//     } catch (err) {
//       setError('Error updating book');
//       console.error('Error updating book:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 bg-dark text-white p-4">
//           <h2 className="h4">Author Dashboard</h2>
//           <ul className="list-unstyled">
//             {['Home', 'My Books'].map((section) => (
//               <li key={section}>
//                 <button
//                   className={`btn btn-link text-white text-start w-100 ${activeSection === section ? 'fw-bold' : ''}`}
//                   onClick={() => setActiveSection(section)}
//                 >
//                   {section}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 p-4">
//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}

//           {activeSection === 'Home' && (
//             <>
//               <h1 className="mb-4">Welcome, Author!</h1>
//               <p>This is your author dashboard. Use the sidebar to manage your books, reviews, and notifications.</p>
//             </>
//           )}

//           {activeSection === 'My Books' && (
//             <>
//               <div className="mb-4">
//                 <h2 className="h5">My Books</h2>
//                 {isFetching ? (
//                   <Spinner animation="border" variant="primary" />
//                 ) : books.length === 0 ? (
//                   <p>No books published yet.</p>
//                 ) : (
//                   <Row>
//                     {books.map((book) => (
//                       <Col key={book.id} md={4} className="mb-3">
//                         <Card>
//                           {book.imageUrl && (
//                             <Card.Img
//                               variant="top"
//                               src={book.imageUrl}
//                               style={{ height: '200px', objectFit: 'cover' }}
//                             />
//                           )}
//                           <Card.Body>
//                             <Card.Title>
//                               <input
//                                 type="text"
//                                 name="title"
//                                 value={book.title}
//                                 onChange={(e) => handleEditChange(e, book.id)}
//                                 disabled={isLoading}
//                               />
//                             </Card.Title>
//                             <Card.Text>
//                               <textarea
//                                 name="description"
//                                 value={book.description}
//                                 onChange={(e) => handleEditChange(e, book.id)}
//                                 disabled={isLoading}
//                                 rows={3}
//                               />
//                             </Card.Text>
//                             <Card.Text>
//                               <strong>Genre:</strong>
//                               <input
//                                 type="text"
//                                 name="genre"
//                                 value={book.genre}
//                                 onChange={(e) => handleEditChange(e, book.id)}
//                                 disabled={isLoading}
//                               />
//                             </Card.Text>
//                             <Card.Text>
//                               <strong>Price:</strong>
//                               <input
//                                 type="number"
//                                 name="price"
//                                 value={book.price}
//                                 onChange={(e) => handleEditChange(e, book.id)}
//                                 disabled={isLoading}
//                               />
//                             </Card.Text>
//                           </Card.Body>
//                           <Card.Footer>
//                             <Button
//                               variant="primary"
//                               onClick={() => handleEditBook(book.id)}
//                               disabled={isLoading}
//                             >
//                               {isLoading ? 'Saving...' : 'Save Changes'}
//                             </Button>
//                           </Card.Footer>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthorDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
  price: number;
  imageUrl: string;
  isEditing: boolean;  // Track editing status
}

const AuthorDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    genre: 'Fiction',
    price: 0,
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('Home');
  const navigate = useNavigate();

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi'];

  // Fetch books
  const fetchBooks = async () => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      const userName = localStorage.getItem('userName');
      const res = await axios.get(`http://localhost:5000/author/my-books/${userName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      setError('Error fetching books');
      console.error('Error fetching books:', err);
    } finally {
      setIsFetching(false);
    }
  };

  // Handle input changes in the "Publish Book" form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Handle publishing a new book
  const handlePublishBook = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:5000/author/publish-book', newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Book published successfully!');
      setNewBook({
        title: '',
        description: '',
        genre: 'Fiction',
        price: 0,
        imageUrl: '',
      });
      fetchBooks(); // Fetch books again after publishing a new one
    } catch (err) {
      setError('Error publishing book');
      console.error('Error publishing book:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing mode toggle
  const toggleEdit = (bookId: number) => {
    setBooks(books.map((book) =>
      book.id === bookId ? { ...book, isEditing: !book.isEditing } : book
    ));
  };

  // Handle changes in edit form
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, bookId: number) => {
    const { name, value } = e.target;
    setBooks(books.map(book =>
      book.id === bookId ? { ...book, [name]: value } : book
    ));
  };

  // Handle saving the changes to a book after editing
  const handleSaveChanges = async (bookId: number) => {
    const updatedBook = books.find(book => book.id === bookId);
    if (!updatedBook) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(`http://localhost:5000/books/${bookId}`, updatedBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Book updated successfully!');
      fetchBooks(); // Fetch books again to get the latest data
    } catch (err) {
      setError('Error updating book');
      console.error('Error updating book:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4">
          <h2 className="h4">Author Dashboard</h2>
          <ul className="list-unstyled">
            {['Home', 'My Books', 'Publish Book'].map((section) => (
              <li key={section}>
                <button
                  className={`btn btn-link text-white text-start w-100 ${activeSection === section ? 'fw-bold' : ''}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {activeSection === 'Home' && (
            <>
              <h1 className="mb-4">Welcome, Author!</h1>
              <p>This is your author dashboard. Use the sidebar to manage your books, reviews, and notifications.</p>
            </>
          )}

          {activeSection === 'My Books' && (
            <>
              <div className="mb-4">
                <h2 className="h5">My Books</h2>
                {isFetching ? (
                  <Spinner animation="border" variant="primary" />
                ) : books.length === 0 ? (
                  <p>No books published yet.</p>
                ) : (
                  <Row>
                    {books.map((book) => (
                      <Col key={book.id} md={4} className="mb-3">
                        <Card>
                          {book.imageUrl && (
                            <Card.Img
                              variant="top"
                              src={book.imageUrl}
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                          )}
                          <Card.Body>
                            {book.isEditing ? (
                              <>
                                <Form.Control
                                  type="text"
                                  name="title"
                                  value={book.title}
                                  onChange={(e) => handleEditChange(e, book.id)}
                                />
                                <Form.Control
                                  as="textarea"
                                  name="description"
                                  value={book.description}
                                  onChange={(e) => handleEditChange(e, book.id)}
                                  rows={3}
                                />
                                <Form.Control
                                  type="text"
                                  name="genre"
                                  value={book.genre}
                                  onChange={(e) => handleEditChange(e, book.id)}
                                />
                                <Form.Control
                                  type="number"
                                  name="price"
                                  value={book.price}
                                  onChange={(e) => handleEditChange(e, book.id)}
                                />
                              </>
                            ) : (
                              <>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.description}</Card.Text>
                                <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
                                <Card.Text><strong>Price:</strong> ₹{book.price}</Card.Text>
                              </>
                            )}
                          </Card.Body>
                          <Card.Footer>
                            {book.isEditing ? (
                              <Button
                                variant="success"
                                onClick={() => handleSaveChanges(book.id)}
                                disabled={isLoading}
                              >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                onClick={() => toggleEdit(book.id)}
                              >
                                Edit
                              </Button>
                            )}
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            </>
          )}

          {activeSection === 'Publish Book' && (
            <>
              <h2 className="h5">Publish a New Book</h2>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter book description"
                  />
                </Form.Group>

                <Form.Group controlId="formGenre" className="mt-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    as="select"
                    name="genre"
                    value={newBook.genre}
                    onChange={handleInputChange}
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newBook.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </Form.Group>

                <Form.Group controlId="formImageUrl" className="mt-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    value={newBook.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handlePublishBook}
                  disabled={isLoading}
                >
                  {isLoading ? 'Publishing...' : 'Publish Book'}
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;

//error publishing book for the (last update)
