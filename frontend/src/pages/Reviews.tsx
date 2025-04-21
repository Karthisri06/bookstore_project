import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup, Alert } from 'react-bootstrap';

const Reviews = ({ bookId }: { bookId: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch reviews for the book
    axios.get(`/api/reviews/${bookId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch(() => {
        setErrorMessage("Error fetching reviews.");
      });
  }, [bookId]);

  const handleAddReview = () => {
    // Add review logic
    axios.post(`/api/reviews/${bookId}`, { text: reviewText })
      .then((response) => {
        setReviews([...reviews, response.data]);
        setReviewText(""); // Reset review input
      })
      .catch(() => {
        setErrorMessage("Error adding review.");
      });
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
            {/* Edit/Delete buttons can go here */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Reviews;

