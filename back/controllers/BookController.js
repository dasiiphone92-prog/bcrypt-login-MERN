const Book = require('../models/bookModel.js');

// Create book
const createBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send required fields: title, author, publishYear',
      });
    }

    const book = await Book.create({ title, author, publishYear });
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const result = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
