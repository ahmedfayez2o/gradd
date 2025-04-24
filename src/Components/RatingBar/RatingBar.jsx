import React from 'react';

const RatingBar = ({ ratingCounts, totalRatings }) => {
  return (
    <div className="rating-bar-container">
      {Object.entries(ratingCounts)
        .sort(([a], [b]) => b - a)
        .map(([stars, count]) => {
          const percentage = totalRatings
            ? ((count / totalRatings) * 100).toFixed(1)
            : 0;
          return (
            <div key={stars} className="rating-row">
              <span className="star-label">{stars} stars</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="rating-count">
                {count.toLocaleString()} ({percentage}%)
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default RatingBar;