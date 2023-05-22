import React from 'react';
import Books from './Books.jsx';
import { createRoot } from 'react-dom/client';

const BookupApp = () => {

  return (
    <div>
      <Books />
    </div>
  );
};

export default BookupApp;

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("bookup-app");
  app && createRoot(app).render(<BookupApp />);
});
