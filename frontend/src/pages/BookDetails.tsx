import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../services/AuthContext";
import { useCart } from "../services/CartContext";

interface Review {
  book: string;
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
  price: number;
  reviews: Review[];
}

interface ReviewData {
  id: number;
  comment: string;
  rating: number;
  user: string;
}

type CartItem = {
  id: string;
  title: string;
  price: number;
  book: Book;
  quantity: number;
};

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState<Review>({
    user: "",
    comment: "",
    rating: 5,
    book: "",
  });
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
        setNewReview((prev) => ({
          ...prev,
          book: res.data.title,
          user: user?.name || "",
        }));
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id, user]);

  useEffect(() => {
    if (book?.title) {
      axios
        .get(`http://localhost:5000/reviews/book/${book.title}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    }
  }, [book?.title]);

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit a review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Review added successfully!");
      setNewReview({ user: user.name, comment: "", rating: 5, book: book?.title || "" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  const handleBuyNow = () => {
    if (!user || user.role !== "user") {
      toast.error("Please login as a user to purchase.");
      return;
    }
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = () => {
    toast.success("Purchase successful!");
    setShowPurchaseModal(false);
  };

  const handleAddToCart = () => {
    if (!book) return;

    const cartItem: CartItem = {
      id: String(book.id),
      title: book.title,
      price: book.price,
      book: book,
      quantity: 1,
    };

    // addToCart(cartItem);
    toast.success("Book added to cart!");
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!book)
    return <p className="text-danger text-center mt-4">Book not found</p>;

  return (
    <div className="container mt-4">
      <Card className="p-3 shadow">
        <div className="row">
          <div className="col-md-4">
            <Card.Img variant="top" src={book.imageUrl} />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title>
                <strong>Title:</strong> {book.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <strong>Author:</strong> {book.author}
              </Card.Subtitle>
              <Card.Text>
                <strong>Description:</strong> {book.description}
              </Card.Text>
              <Card.Text>
                <strong>Genre:</strong> {book.genre}
              </Card.Text>
              <Card.Text>
                <strong>Rating:</strong> ⭐ {book.rating}/5
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{book.price}
              </Card.Text>

              <div className="d-grid gap-2 d-md-block mt-3">
                <Button variant="primary" className="me-2" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="success" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>

      {/* Reviews Section */}
      <h4 className="mt-5">User Reviews:</h4>
      {reviews.length === 0 ? (
        <p className="text-muted">No reviews yet. Be the first to review!</p>
      ) : (
        <ListGroup className="mt-3">
          {reviews.map((review) => (
            <ListGroup.Item key={review.id} className="mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <strong>{review.user || "Anonymous"}</strong>
                <span className="text-warning">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <div className="mt-2">{review.comment}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Review Form */}
      <h4 className="mt-5">Add Your Review:</h4>
      {user ? (
        <Form onSubmit={handleSubmitReview}>
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
      ) : (
        <p className="text-danger">Please log in to write a review.</p>
      )}

      {/* Purchase Modal */}
      <Modal show={showPurchaseModal} onHide={() => setShowPurchaseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Product:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Price:</strong> ₹{book.price}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPurchaseModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetails;



