import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from "./Book.jsx"
import BookForm from './BookForm.jsx';

const Books = () => {

  const [books, setBooks] = useState([])
  const [isUpdate, setUpdate] = useState(false)
  const [hideFinished, setHideFinished] = useState(false)

  useEffect(() => {
    getBooks()
    setUpdate(false)},
    [isUpdate])

  const getBooks = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/books')
    const data = response.data
    setBooks(data.reverse())
  }

  const updateBooks = (Book) => {
    let book = books;
    book.unshift(Book);
    setBooks(books);
    setUpdate(true)
  }

  const handleClick = () => {
    setHideFinished(!hideFinished);
  }

  return (
    <div className="table-responsive px-4">
      <BookForm updateBooks={updateBooks}/>
        <div className='d-flex justify-content-center px-2'>
          <button className="btn btn-primary btn-block mb-3 w-100" onClick={handleClick}>
            {hideFinished ? "Show Books Already Read" : "Hide Books Already Read"}
          </button>
        </div>
      <table className="table">
        <thead>
          <tr className=''>
            <th className="text-center">Status</th>
            <th className="text-center">Title</th>
            <th className="text-center">Author</th>
            <th className=""></th>
            <th className=""></th>
          </tr>
        </thead>
        <br />
        <tbody className='mt-4'>
          {books.map((book) => (
          <>
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              finished={book.finished}
              id={book.id}
              getBooks={getBooks}
              hideFinished={hideFinished}
              />
          </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
