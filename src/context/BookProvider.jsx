import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import BookContext from './BookContext';
import { getBooks, getBooksWithSearchFilter, getBooksWithSearchFilterAndYear } from '../service';

function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadBooks() {
      const data = await getBooks();

      setBooks(data);
    }

    loadBooks();
  }, []);

  useEffect(() => {
    const itemIndex = page * 10;
    let data = [];

    if (page === 0) data = books.slice(0, itemIndex);
    else data = books.slice(itemIndex - 10, itemIndex);

    setBooksToShow(data);
  }, [page, books]);

  function booksLoader(searchType, searchValue, years) {
    const requestDictionary = {
      search: async () => {
        const data = await getBooksWithSearchFilter(searchValue);

        setBooks(data);
      },
      searchAndYear: async () => {
        const data = await getBooksWithSearchFilterAndYear(searchValue, years);

        setBooks(data);
      },
    };

    requestDictionary[searchType]();
  }

  const state = useMemo(() => ({
    books,
    booksToShow,
    page,
    booksLoader,
    setPage,
  }), [books, booksToShow]);

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
