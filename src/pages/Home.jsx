import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import BookContext from '../context/BookContext';

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
      default: () => setPage(Number(target.value)),
    };

    buttonDictionary[target.className]();
  }

  return (
    <div>
      <Header />
      {
        books.map((book) => <BookCard key={`${book.title}-${book.author}`} book={book} />)
      }
      <div>
        <button className="prev" onClick={handleClick} type="button">{'<'}</button>
        <button value={page} className="default" onClick={handleClick} type="button">{ page }</button>
        <button value={page + 1} className="default" onClick={handleClick} type="button">{ page + 1 }</button>
        <button value={page + 2} className="default" onClick={handleClick} type="button">{ page + 2 }</button>
        <button className="next" onClick={handleClick} type="button">{'>'}</button>
      </div>
    </div>
  );
}

export default Home;
