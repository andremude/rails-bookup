import React, {useState} from 'react'
import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders.jsx";

const BookForm = ({ updateBooks }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
     setAxiosHeaders();
    const dataBook = { title, author };
    try {
      const res = await axios
       .post("http://localhost:3000/api/v1/books"
      ,{book: dataBook})
      updateBooks(res.data)
      setTitle("");
      setAuthor("");

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='d-flex justify-content-center row mb-2'>
      <form onSubmit={handleSubmit} className="my-3 row">
        <div className="form-group col-md-5 my-2">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='form-control'
            placeholder="Book's title"
            id="title"/>
        </div>
        <div className="form-group col-md-5 my-2">
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className='form-control'
            placeholder="Book's author"
            id="author"/>
        </div>
        <div className="form-group col-md-2 my-2 text-center">
          <button type='submit' className='btn btn-success w-100'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
