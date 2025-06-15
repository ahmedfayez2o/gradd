import React from 'react';
import './RatingBar.css';

const RatingBar = ({ ratingCounts, totalRatings }) => {
  return (
    <div className="rating-bar-container">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratingCounts[star] || 0;
        const percentage = totalRatings ? ((count / totalRatings) * 100).toFixed(1) : 0;

        return (
          <div key={star} className="rating-row">
            <span className="star-label">{star} Stars</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="rating-percentage">{percentage}%</span>
            <span className="rating-count">({count})</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBar;
