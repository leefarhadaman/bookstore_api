# Bookstore API

A RESTful API for a Bookstore app built with Node.js, Express, JWT authentication, and file-based persistence.

## Features
- User registration and login with JWT authentication
- CRUD operations for books (only the creator can update/delete)
- File-based storage (books.json, users.json)
- Request logging, error handling
- Bonus: Search by genre, pagination

## Folder Structure

```
project-root/
├── index.js
├── users.json
├── books.json
├── package.json
├── README.md
└── src/
    ├── routes/
    │   ├── auth.js
    │   └── books.js
    ├── middleware/
    │   ├── auth.js
    │   └── logger.js
    └── utils/
        └── fileUtils.js
```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3000` by default.

---

## How to Test Endpoints (via Postman or curl)

You can use [Postman](https://www.postman.com/) or `curl` to test the API endpoints.

### Register a User
```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"123456"}'
```
The response will include a JWT token. Use this token for all /books endpoints:

### List All Books
```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/books
```

### Search Books by Genre
```bash
curl -H "Authorization: Bearer <token>" "http://localhost:3000/books/search?genre=Fiction"
```

### Add a Book
```bash
curl -X POST http://localhost:3000/books -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","publishedYear":2023}'
```

### Update a Book
```bash
curl -X PUT http://localhost:3000/books/<bookId> -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"New Title","author":"New Author","genre":"Fiction","publishedYear":2024}'
```

### Delete a Book
```bash
curl -X DELETE http://localhost:3000/books/<bookId> -H "Authorization: Bearer <token>"
```

---

## API Documentation

### User Authentication
- **POST /register**
  - Register a new user.
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: `{ "message": "User registered" }`

- **POST /login**
  - Login and receive a JWT token.
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: `{ "token": "..." }`

### Book Management (require Authorization header: `Bearer <token>`)
- **GET /books**
  - List all books. Supports pagination with `?page=...&limit=...`.
  - Response: `{ total: Number, books: [ ... ] }`

- **GET /books/search?genre=...**
  - Filter books by genre.
  - Response: `{ total: Number, books: [ ... ] }`

- **GET /books/:id**
  - Get book by ID.
  - Response: Book object or 404 if not found.

- **POST /books**
  - Add a new book.
  - Request body: `{ "title": "...", "author": "...", "genre": "...", "publishedYear": 2023 }`
  - Response: Created book object.

- **PUT /books/:id**
  - Update a book (only by creator).
  - Request body: `{ "title": "...", "author": "...", "genre": "...", "publishedYear": 2023 }`
  - Response: Updated book object.

- **DELETE /books/:id**
  - Delete a book (only by creator).
  - Response: `{ message: "Book deleted", book: { ... } }`

---

## Development & Testing
- Run tests (if implemented):
  ```bash
  npm test
  ```

---