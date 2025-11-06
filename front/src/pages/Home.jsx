import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/BooksTable';
import api from "../api";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api
      .get(`/books`)
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <div className='flex justify-between items-center'>
        <BooksTable books={books} />
      </div>
     </div>
  );
};

export default Home;
