
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

interface Book {
  id: number;
  title: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

const mockBooks: Book[] = [
  { id: 1, title: 'Mystery of the Lost Book' },
  { id: 2, title: 'The Untold Story' }
];

const mockAuthors: Author[] = [
  { id: 101, name: 'Karthisri K.', email: 'karthisri@example.com' },
  { id: 102, name: 'Deepak D.', email: 'deepak@example.com' }
];

const UnassignedBooksAssign: React.FC = () => {
  const [selectedAuthors, setSelectedAuthors] = useState<{ [bookId: number]: string }>({});

  const handleSelect = (bookId: number, email: string) => {
    setSelectedAuthors((prev) => ({ ...prev, [bookId]: email }));
  };

  const handleAssign = (bookId: number) => {
    const email = selectedAuthors[bookId];
    if (email) {
      alert(`Book ID ${bookId} assigned to author with email: ${email}`);
     
    } else {
      alert('Please select an author first!');
    }
  };

  return (
    <Container className="py-4">
      <h2>📚 Unassigned Books - Assign Authors</h2>
      {mockBooks.map((book) => (
        <Card key={book.id} className="mb-3">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4}>
                <h5>{book.title}</h5>
              </Col>
              <Col md={4}>
                <Form.Select
                  onChange={(e) => handleSelect(book.id, e.target.value)}
                  value={selectedAuthors[book.id] || ''}
                >
                  <option value="">-- Select Author by Email --</option>
                  {mockAuthors.map((author) => (
                    <option key={author.id} value={author.email}>
                      {author.name} ({author.email})
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Button variant="success" onClick={() => handleAssign(book.id)}>
                  ✅ Assign Author
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default UnassignedBooksAssign;

