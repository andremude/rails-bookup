import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from "./Book.jsx"
import BookForm from './BookForm.jsx';

const Books = () => {

  const [books, setBooks] = useState([])
  const [isUpdate, setUpdate] = useState(false)

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

  return (
    <div className="table-responsive px-2">
      <BookForm updateBooks={updateBooks}/>
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
              id={book.id}
              getBooks={getBooks}
              />
          </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
