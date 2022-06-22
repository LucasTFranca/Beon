import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import BookContext from './BookContext';
import { getAllBooks } from '../service';

function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    async function booksLoader() {
      const data = await getAllBooks();

      setBooks(data);
    }

    booksLoader();
  }, []);

  const state = useMemo(() => ({ books, filteredBooks, setFilteredBooks }), [books, filteredBooks]);

  return (
    <BookContext.Provider value={state}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default BookProvider;
