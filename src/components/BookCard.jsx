import React from 'react';
import PropTypes from 'prop-types';

function BookCard({ book }) {
  const {
    title,
    author,
    language,
    year,
  } = book;

  return (
    <div>
      <span>{title}</span>
      <span>{author}</span>
      <span>{language}</span>
      <span>{year}</span>
      <span>detalhes</span>
    </div>
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
