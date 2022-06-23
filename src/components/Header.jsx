import React, { useContext, useEffect, useState } from 'react';
import BookContext from '../context/BookContext';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [firstYearValue, setFirstYearValue] = useState(0);
  const [lastYearValue, setLastYearValue] = useState(0);
  const [resultValue, setResultValue] = useState(0);
  const { books, booksLoader } = useContext(BookContext);

  useEffect(() => {
    setResultValue(books.length);
  }, [books]);

  function handleChange({ target }) {
    const { id, value } = target;

    const inputDictionary = {
      search: () => setSearchValue(value),
      firstYear: () => setFirstYearValue(value),
      lastYear: () => setLastYearValue(value),
    };

    inputDictionary[id]();
  }

  function searchBooks() {
    const years = { firstYear: firstYearValue, lastYear: lastYearValue };

    if (searchValue && (!firstYearValue || !lastYearValue)) booksLoader('search', searchValue);
    else if (searchValue && (firstYearValue || lastYearValue)) booksLoader('searchAndYear', searchValue, years);
    else booksLoader('default');
  }

  return (
    <div>
      <span>Beon</span>
      <input id="search" onChange={handleChange} value={searchValue} type="text" />
      <button onClick={searchBooks} type="button">Buscar</button>
      <input id="firstYear" onChange={handleChange} value={firstYearValue} min={0} type="number" />
      <input id="lastYear" onChange={handleChange} value={lastYearValue} min={0} type="number" />
      <span>{`${resultValue} resultados encontrados`}</span>
    </div>
  );
}

export default Header;
