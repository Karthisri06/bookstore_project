import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Form, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../FormComponents/AuthContext";
import { useCart } from "../Cart/CartContext"; 
import { CartItem } from "../types";
import { Book } from "../types";

interface Review {
  book: string;
  user: string;
  comment: string;
  rating: number;
}

interface ReviewData {
  id: number;
  comment: string;
  rating: number;
  user: string;
}



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
  const [reviewAdded, setReviewAdded] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart(); 
  const isLoggedIn = !!localStorage.getItem("token");



  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(res.data);
        setNewReview((prev) => ({ ...prev, book: res.data.title }));
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);
// console.log(book, "book in cart");

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
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to post a review.");
        return;
      }

      await axios.post(`http://localhost:5000/reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Review submitted!");
      setReviewAdded(true);
      setNewReview({
        user: "",
        comment: "",
        rating: 5,
        book: book?.title || "",
      });

      // Refresh reviews
      const updatedReviews = await axios.get(
        `http://localhost:5000/reviews/book/${book?.title}`
      );
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Something went wrong.");
    }
  };
   
   const handleAddToCart = (book: Book) => {
     if (!user) {
       toast.info("Login to add to cart");
       return;
     }
   
     addToCart({
       id: book.id,
       bookName: book.title,
       description: book.description,
       price: book.price,
       imageUrl: book.imageUrl,
       userName: user?.userName || "user",
     });
     
     toast.success(`${book.title} has been added to your cart!`);
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
                <strong>Author:</strong> {book.authors}
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

              <div className="d-grid gap-2 d-md-block mt-3">
              <Button
  variant="outline-primary"
  size="sm"
  onClick={() => {
    if (!user) {
      toast.info("Please log in to add items to your cart.");
      return;
    }

    handleAddToCart(book); 
  }}
>
  Add to Cart
</Button>



                <Button variant="success">
                  Buy Now
                </Button>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>

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

      <h4 className="mt-5">Add Your Review:</h4>
      <Form onSubmit={handleSubmitReview}>
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            name="user"
            value={newReview.user}
            onChange={handleReviewChange}
            placeholder="Enter your name"
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
          <Form.Select
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
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>

      {reviewAdded && (
        <div className="alert alert-success mt-4">
          Your review has been added!
        </div>
      )}
    </div>
  );
};

export default BookDetails;

