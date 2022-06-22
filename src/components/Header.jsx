import React, { useContext, useState } from 'react';
import BookContext from '../context/BookContext';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [firstYearValue, setFirstYearValue] = useState(undefined);
  const [lastYearValue, setLastYearValue] = useState(undefined);
  const { books, setFilteredBooks } = useContext(BookContext);

  function handleChange({ target }) {
    const { id, value } = target;

    const inputDictionary = {
      search: () => setSearchValue(value),
      firstYear: () => setFirstYearValue(value),
      lastYear: () => setLastYearValue(value),
    };

    inputDictionary[id]();
  }

  function filterBooks() {
    const searchValueInLower = searchValue.toLowerCase();

    const foundBooks = books.filter(({ author, language, title }) => {
      const authorLower = author.toLowerCase();
      const languageLower = language.toLowerCase();
      const titleLower = title.toLowerCase();

      return (
        authorLower.includes(searchValueInLower)
        || languageLower.includes(searchValueInLower)
        || titleLower.includes(searchValueInLower)
      );
    });

    if (!firstYearValue || !lastYearValue) return foundBooks;

    const filteredBooks = foundBooks.filter(({ year }) => (
      year >= firstYearValue && year <= lastYearValue
    ));

    return filteredBooks;
  }

  async function searchBooks() {
    const filteredBooks = filterBooks();

    await setFilteredBooks(filteredBooks);
  }

  return (
    <div>
      <img src="" alt="Beon" />
      <input id="search" onChange={handleChange} value={searchValue} type="text" />
      <button onClick={searchBooks} type="button">Buscar</button>
      <input id="firstYear" onChange={handleChange} value={firstYearValue} min={0} type="number" />
      <input id="lastYear" onChange={handleChange} value={lastYearValue} min={0} type="number" />
    </div>
  );
}

export default Header;
