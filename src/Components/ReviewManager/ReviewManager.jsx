import React, { useState, useEffect } from 'react';
import RatingBar from '../RatingBar/RatingBar';
import ReviewSection from '../ReviewSection/ReviewSection';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ReviewManager = ({ bookId }) => {
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const API_BASE_URL = 'http://localhost:5000'; // يمكنك تغييره إذا لزم

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/${bookId}`);
      const data = response.data;
      setReviews(data);

      const counts = data.reduce(
        (acc, review) => {
          acc[review.rating]++;
          return acc;
        },
        { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      );
      setRatingCounts(counts);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleAddReview = async () => {
    if (newReviewText.trim() === "" || newReviewRating === 0) {
      toast.error("Please enter a review and select a rating.");
      return;
    }

    const newReview = {
      user: "You",
      text: newReviewText,
      rating: newReviewRating,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/reviews/${bookId}`, newReview);

      if (response.status === 201 || response.status === 200) {
        toast.success("Review submitted successfully!");
        fetchReviews();
        setNewReviewText("");
        setNewReviewRating(0);
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error("An error occurred while submitting review.");
    }
  };

  const handleShowMore = () => {
    setReviewsToShow(reviewsToShow + 4);
  };

  const totalRatings = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="reviews-section">
      <h2>Community Reviews</h2>

      {totalRatings > 0 ? (
        <RatingBar ratingCounts={ratingCounts} totalRatings={totalRatings} />
      ) : (
        <p className="no-ratings">No ratings available</p>
      )}

      <ReviewSection
        reviews={reviews}
        reviewsToShow={reviewsToShow}
        handleShowMore={handleShowMore}
        handleAddReview={handleAddReview}
        newReviewText={newReviewText}
        setNewReviewText={setNewReviewText}
        newReviewRating={newReviewRating}
        setNewReviewRating={setNewReviewRating}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ReviewManager;
