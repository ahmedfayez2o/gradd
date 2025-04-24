import React from 'react';

const BookInfo = ({ book, averageRating, totalRatings }) => {
  return (
    <div className="book-info">
      <h1>{book.title}</h1>
      <p className="book-author">{book.authors}</p>
      <div className="book-rating">
        <span>{averageRating} ★</span> ({totalRatings} ratings)
      </div>
      <p className="book-description">{book.description}</p>

      <div className="extra-book-info">
        <div className="genres-container">
          <strong>Genres:</strong>
          <div className="genres-tags">
            {book.genres.split(', ').map((genre, index) => (
              <span key={index} className="genre-badge">{genre}</span>
            ))}
          </div>
        </div>
        <p><strong>Format:</strong> {book.format}</p>
        <p><strong>Published:</strong> {book.published}</p>
        <p><strong>ASIN:</strong> {book.asin}</p>
        <p><strong>Language:</strong> {book.language}</p>
      </div>
    </div>
  );
};

export default BookInfo;