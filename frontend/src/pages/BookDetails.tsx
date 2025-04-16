import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Form } from "react-bootstrap";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  imageUrl: string;
  genre: string;
  reviews: Review[];
}

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState<Review>({
    user: "",
    comment: "",
    rating: 5,
  });
  const [reviewAdded, setReviewAdded] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the review to the backend
      await axios.post(`http://localhost:5000/books/${id}/reviews`, newReview);
      setReviewAdded(true);
      
      // Refresh book data to include the new review
      const updatedBook = await axios.get(`http://localhost:5000/books/${id}`);
      setBook(updatedBook.data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (!book) return <p className="text-danger text-center mt-4">Book not found</p>;

  return (
    <div className="container mt-4">
      <Card className="p-3 shadow">
        <div className="row">
          <div className="col-md-4">
            <Card.Img variant="top" src={book.imageUrl} />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title><strong>Title:</strong> {book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <strong>Author:</strong> {book.author}
              </Card.Subtitle>
              <Card.Text><strong>Description:</strong> {book.description}</Card.Text>
              <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
              <Card.Text><strong>Rating:</strong> ⭐ {book.rating}/5</Card.Text>

              <div className="d-grid gap-2 d-md-block mt-3">
                <Button variant="primary" className="me-2">Add to Cart</Button>
                <Button variant="success">Buy Now</Button>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>

      <h4 className="mt-5">User Reviews:</h4>
      {book.reviews && book.reviews.length > 0 ? (
        book.reviews.map((rev, idx) => (
          <Card key={idx} className="mt-3 p-3">
            <p><strong>{rev.user}</strong> rated it {rev.rating}</p>
            <p>{rev.comment}</p>
          </Card>
        ))
      ) : (
        <p className="text-muted mt-2">No reviews yet.</p>
      )}

      {/* Review Form */}
      <h4 className="mt-5">Add Your Review:</h4>
      <Form onSubmit={handleSubmitReview}>
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            name="user"
            value={newReview.user}
            onChange={handleReviewChange}
            placeholder="Enter your username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={newReview.comment}
            onChange={handleReviewChange}
            rows={3}
            placeholder="Write your review"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            name="rating"
            value={newReview.rating}
            onChange={handleReviewChange}
            required
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>

      {/* Show success message */}
      {reviewAdded && <div className="alert alert-success mt-4">Your review has been added!</div>}
    </div>
  );
};

export default BookDetails;

