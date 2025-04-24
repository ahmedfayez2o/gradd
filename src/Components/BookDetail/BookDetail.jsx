import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';
import BookInfo from '../BookInfo/BookInfo';
import AuthorInfo from '../AuthorInfo/AuthorInfo';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [authorInfo, setAuthorInfo] = useState(null);

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

  const addToFavorites = () => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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

        <BookInfo book={book} />
      </div>

      <AuthorInfo authorInfo={authorInfo} />
    </div>
  );
};

export default BookDetail;