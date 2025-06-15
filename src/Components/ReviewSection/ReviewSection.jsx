import React from 'react';
import './ReviewSection.css';

const ReviewSection = ({
  reviews,
  reviewsToShow,
  handleShowMore,
  handleAddReview,
  newReviewText,
  setNewReviewText,
  newReviewRating,
  setNewReviewRating,
}) => {
  return (
    <div className="reviews-section">
      <div className="add-review">
        <h3>Add Your Review</h3>

        <div className="rating-input">
  <label htmlFor="rating" className="rating-label">Rating:</label>
  <select
    id="rating"
    className="rating-select"
    value={newReviewRating}
    onChange={(e) => setNewReviewRating(Number(e.target.value))}
  >
    <option value="0">Select Rating</option>
    {[5, 4, 3, 2, 1].map((star) => (
      <option key={star} value={star}>
        {star} Stars
      </option>
    ))}
  </select>
</div>


        <textarea
          placeholder="Write your review here..."
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
        />

        <button className="submit-comment-button" onClick={handleAddReview}>
          Submit Review
        </button>
      </div>

      <div className="reviews-list">
        {reviews.slice(0, reviewsToShow).map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-user">{review.user}</div>
            <div className="review-rating">{'⭐'.repeat(review.rating)}</div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}

        {reviews.length > reviewsToShow && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
 