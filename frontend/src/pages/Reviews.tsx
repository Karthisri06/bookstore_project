// Reviews.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup, Alert } from 'react-bootstrap';
import { toast } from "react-toastify";

const Reviews = ({ bookId }: { bookId: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    
    axios.get(`/reviews/${bookId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch(() => {
        setErrorMessage("Error fetching reviews.");
      });
  }, [bookId]);

  
const handleAddReview = async () => {
  try {
    await axios.post("http://localhost:5000/reviews", {
      content: reviewText,
      rating: 5,
      userId: 1,
      bookId: parseInt(bookId),
    });
    toast.success("Review submitted successfully!");
    setReviewText("");
  } catch (error: any) {
    console.error("Error adding review: ", error);
    toast.error("Failed to submit review ");
  }
};
  return (
    <div>
      <h1>Reviews</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Control 
        as="textarea" 
        rows={3} 
        value={reviewText} 
        onChange={(e) => setReviewText(e.target.value)} 
        placeholder="Write a review..."
      />
      <Button variant="primary" onClick={handleAddReview}>Submit Review</Button>

      <ListGroup className="mt-3">
        {reviews.map((review) => (
          <ListGroup.Item key={review.id}>
            {review.text}
            
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Reviews;
