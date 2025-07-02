const express = require('express');
const router = express.Router();
const { readJson, writeJson, BOOKS_FILE } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

// GET /books
router.get('/', async (req, res) => {
  let books = await readJson(BOOKS_FILE);
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || books.length;
  const start = (page - 1) * limit;
  const paginated = books.slice(start, start + limit);
  res.json({ total: books.length, books: paginated });
});

// GET /books/search?genre=...
router.get('/search', async (req, res) => {
  const { genre } = req.query;
  let books = await readJson(BOOKS_FILE);
  if (genre) {
    books = books.filter(b => b.genre === genre);
  }
  res.json({ total: books.length, books });
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  const books = await readJson(BOOKS_FILE);
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const books = await readJson(BOOKS_FILE);
  const book = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id
  };
  books.push(book);
  await writeJson(BOOKS_FILE, books);
  res.status(201).json(book);
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  const books = await readJson(BOOKS_FILE);
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  if (books[idx].userId !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
  const { title, author, genre, publishedYear } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'All fields required' });
  }
  books[idx] = { ...books[idx], title, author, genre, publishedYear };
  await writeJson(BOOKS_FILE, books);
  res.json(books[idx]);
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  const books = await readJson(BOOKS_FILE);
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  if (books[idx].userId !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
  const deleted = books.splice(idx, 1);
  await writeJson(BOOKS_FILE, books);
  res.json({ message: 'Book deleted', book: deleted[0] });
});

module.exports = router; 