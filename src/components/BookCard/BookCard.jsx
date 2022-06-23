import React from 'react';
import PropTypes from 'prop-types';

import './BookCard.css';

function BookCard({ book }) {
  const {
    title,
    author,
    language,
    year,
  } = book;

  return (
    <>
      <span className="card-item">{title}</span>
      <span className="card-item">{author}</span>
      <span className="card-item">{language}</span>
      <span className="card-item">{year}</span>
    </>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    language: PropTypes.string,
    year: PropTypes.number,
  }),
}.isRequired;

export default BookCard;
