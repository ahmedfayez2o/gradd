import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';
import BookInfo from '../BookInfo/BookInfo';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import RatingBar from '../RatingBar/RatingBar';
import ReviewSection from '../ReviewSection/ReviewSection';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book details');
        const data = await response.json();

        const bookData = {
          id: id,
          title: data.volumeInfo?.title || 'No title available',
          authors: data.volumeInfo?.authors?.join(', ') || 'Unknown author',
          description: data.volumeInfo?.description || 'No description available.',
          image: data.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
          rating: data.volumeInfo?.averageRating || 'N/A',
          reviewCount: data.volumeInfo?.ratingsCount || 0,
          price: data.saleInfo?.retailPrice?.amount || 'N/A',
          author: data.volumeInfo?.authors ? data.volumeInfo.authors[0] : null,
          genres: data.volumeInfo?.categories?.join(', ') || 'Unknown',
          format: data.volumeInfo?.printType || 'Unknown',
          published: data.volumeInfo?.publishedDate || 'Unknown',
          asin: data.volumeInfo?.industryIdentifiers?.[0]?.identifier || 'N/A',
          language: data.volumeInfo?.language ? data.volumeInfo.language.toUpperCase() : 'Unknown'
        };

        setBook(bookData);
        setLoading(false);

        const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
        setReviews(storedReviews);

        const counts = storedReviews.reduce(
          (acc, review) => {
            acc[review.rating]++;
            return acc;
          },
          { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        );
        setRatingCounts(counts);

        if (bookData.author) {
          fetchAuthorInfo(bookData.author);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchAuthorInfo = async (authorName) => {
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${authorName}`);
        if (!response.ok) throw new Error('Failed to fetch author details');
        const data = await response.json();

        setAuthorInfo({
          name: data.title || authorName,
          description: data.extract || 'No information available.',
          image: data.thumbnail?.source || 'https://via.placeholder.com/100',
          link: data.content_urls?.desktop?.page || '#'
        });
      } catch (err) {
        console.error('Error fetching author info:', err);
      }
    };

    fetchBookData();
  }, [id]);

  const handleAddReview = () => {
    if (newReviewText.trim() === "" || newReviewRating === 0) {
      alert("Please enter a review and select a rating.");
      return;
    }

    const newReview = {
      user: "You",
      text: newReviewText,
      rating: newReviewRating,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    setRatingCounts((prevCounts) => ({
      ...prevCounts,
      [newReviewRating]: prevCounts[newReviewRating] + 1,
    }));

    setNewReviewText("");
    setNewReviewRating(0);
  };

  const handleShowMore = () => {
    setReviewsToShow(reviewsToShow + 4);
  };

  const addToFavorites = () => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const totalRatings = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  const averageRating = totalRatings
    ? (
        Object.entries(ratingCounts).reduce(
          (sum, [stars, count]) => sum + stars * count,
          0
        ) / totalRatings
      ).toFixed(1)
    : "N/A";

  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!book) return <div className="not-found">Book not found</div>;

  return (
    <div className="book-detail-container">
      <div className="book-detail">
        <div className="book-image-container">
          <img src={book.image} alt={book.title} className="book-image" />
          <div className="button-container">
            <button className="borrow-button">BORROW</button>
            <button className="price-button">${book.price}</button>
            <button className="favorite-button" onClick={addToFavorites}>❤️ My Books</button>
          </div>
        </div>

        <BookInfo book={book} averageRating={averageRating} totalRatings={totalRatings} />
      </div>

      <AuthorInfo authorInfo={authorInfo} />

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
      </div>
    </div>
  );
};

export default BookDetail;