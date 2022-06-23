import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import BookCard from '../../components/BookCard/BookCard';
import BookContext from '../../context/BookContext';

import './Home.css';

function Home() {
  const [books, setBooks] = useState([]);
  const {
    books: booksDefault,
    booksToShow,
    page,
    setPage,
  } = useContext(BookContext);

  useEffect(() => {
    if (!booksToShow.length) setBooks(booksDefault);
    else setBooks(booksToShow);
  }, [booksDefault, booksToShow]);

  function handleClick({ target }) {
    const pageOneLess = page - 1;
    const pageOneMore = page + 1;

    const buttonDictionary = {
      prev: () => {
        if (!(pageOneLess === 0)) setPage(pageOneLess);
      },
      next: () => setPage(pageOneMore),
    };

    buttonDictionary[target.id]();
  }

  return (
    <>
      <Header />
      <div className="home">
        <div className="bookcard-container">
          <span className="subtitle">Livro</span>
          <span className="subtitle">Autor</span>
          <span className="subtitle">Idioma</span>
          <span className="subtitle">Ano</span>
          {
            books.map((book) => <BookCard key={`${book.title}-${book.author}`} book={book} />)
          }
        </div>
        <div className="pagination-container">
          <button id="prev" onClick={handleClick} type="button">{'<'}</button>
          <button type="button">{ page }</button>
          <button id="next" onClick={handleClick} type="button">{'>'}</button>
        </div>
      </div>
    </>
  );
}

export default Home;
