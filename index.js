const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const logger = require('./src/middleware/logger');
const authenticateToken = require('./src/middleware/auth');
const authRoutes = require('./src/routes/auth');
const booksRoutes = require('./src/routes/books');

app.use(express.json());
app.use(logger);

// Auth routes
app.use('/', authRoutes);
// Books routes (protected)
app.use('/books', authenticateToken, booksRoutes);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 