import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders.jsx";
import _ from 'lodash'

const Book = ({ title, author, id, finished, getBooks, hideFinished }) => {
  const [isFinished, setIsFinished] = useState(false);

  const debouncedHandleChange = _.debounce(async (e) => {
    const { name, value, checked } = e.target;
    setAxiosHeaders();

    try {
      if (name === "finished") {
        await axios.put(`http://localhost:3000/api/v1/books/${id}`, {
          book: {
            [name]: checked
          },
        });
      } else {
        const response = await axios.put(`http://localhost:3000/api/v1/books/${id}`, {
          book: {
            [name]: value
          },
        });
        if (name === "title") {
          title = response.data.book.title;
        } else if (name === "author") {
          author = response.data.book.author;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);

  useEffect(() => {
    setIsFinished(finished);
  }, [finished]);

  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    setIsFinished(checked);
    await debouncedHandleChange(e);
  };

  const handleChange = (e) => {
    e.persist();
    if (e.target.type === "checkbox") {
      handleCheckboxChange(e);
    } else {
      debouncedHandleChange(e);
    }
  };

  const handleDelete = async () => {
    setAxiosHeaders();
    await axios.delete(`http://localhost:3000/api/v1/books/${id}`);
    getBooks();
  };

  return (
    <tr className={`${isFinished && hideFinished ? `d-none` : "text-center"} ${isFinished ? "table-light text-center" : ""}`}>
      <td>
        <svg
          className={`bi bi-check-circle ${
            isFinished ? `text-success` : `text-muted`
          }`}
          width="2em"
          height="2em"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
            clipRule="evenodd"
          />
        </svg>
      </td>
      <td>
        <input
          type="text"
          name="title"
          defaultValue={title}
          onChange={handleChange}
          disabled={isFinished}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          name="author"
          defaultValue={author}
          onChange={handleChange}
          disabled={isFinished}
          className="form-control"
        />
      </td>
      <td className="text-center">
        <div className="form-check form-check-inline pt-2">
          <input
            type="checkbox"
            name="finished"
            checked={isFinished}
            className="form-check-input"
            onChange={handleChange}
            style={{cursor:"pointer"}}
          />
          <label className="form-check-label">Done</label>
        </div>
      </td>
      <td>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          <svg height="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Book;
