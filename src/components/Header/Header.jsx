import React, { useContext, useEffect, useState } from 'react';
import BookContext from '../../context/BookContext';

import './Header.css';

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
    <div className="header">
      <div className="search-container">
        <div className="search-left-container">
          <span>Beon</span>
        </div>
        <div className="search-right-container">
          <input
            placeholder="Busque livros pelo título, autor ou idioma"
            id="search"
            onChange={handleChange}
            value={searchValue}
            type="text"
          />
          <button onClick={searchBooks} type="button">Buscar</button>
        </div>
      </div>
      <div className="year-container">
        <div className="year-left-container">
          <span>Filtrar ano da publicação:</span>
          <input id="firstYear" onChange={handleChange} value={firstYearValue} min={0} type="number" />
          <span>até</span>
          <input id="lastYear" onChange={handleChange} value={lastYearValue} min={0} type="number" />
        </div>
        <div className="year-right-container">
          <span id="result">{resultValue}</span>
          <span>resultados encontrados</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
