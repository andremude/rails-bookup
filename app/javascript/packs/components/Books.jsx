import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from "./Book.jsx"

const Books = () => {

  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks()},
    [])


  const getBooks = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/books')
    const data = response.data
    setBooks(data.reverse())
  }


  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="col text-center">Status</th>
            <th className="col text-center">Title</th>
            <th className="col text-center">Author</th>
            <th className="col"></th>
            <th className="col"></th>
            </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <>
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              id={book.id}
              />
          </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
