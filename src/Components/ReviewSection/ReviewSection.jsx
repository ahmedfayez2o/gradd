import React, { useState } from 'react';

const ReviewSection = ({ reviews, reviewsToShow, handleShowMore, handleAddReview, newReviewText, setNewReviewText, newReviewRating, setNewReviewRating }) => {
  return (
    <div className="reviews-section">
  

      <div className="add-review">
        <div className="rating-section">
          <p>Rate:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${newReviewRating >= star ? 'filled' : ''}`}
              onClick={() => setNewReviewRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>

        <button onClick={handleAddReview} className="submit-review">Submit Review</button>
      </div>

      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, reviewsToShow).map((review, index) => (
            <div key={index} className="review">
              <div className="review-content">
                <strong>{review.user}</strong>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
          {reviewsToShow < reviews.length && (
            <button className="show-more" onClick={handleShowMore}>Show Me More</button>
          )}
        </>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewSection;