## 📚 Library Management System

A production-ready RESTful API for managing books and borrow operations, built with **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**.

---

### 🧰 Tech Stack

* **Backend:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB (Mongoose ODM)
* **Deployment:** Vercel / Any Node.js-compatible platform
* **Validation & Business Logic:** Mongoose middleware, instance methods, aggregation

---

## 🚀 Getting Started

### 🛆 Prerequisites

* Node.js (v18 or higher)
* MongoDB (local or Atlas)
* `npm` or `npm` installed

---

###  Installation

```bash
git clone https://github.com/BakiAbdullah/Assignment-3.git
cd your folder
npm install   # or npm install
```

---

### ⚙️ Configuration
Create a `.env` file at the root:

```env
PORT = https://assignment-4-backend-ten.vercel.app

DATABASE_URL = mongodb+srv://bakiabdullah:bQQV1JxFXSNVtbHn@cluster0.uqgxsrk.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0
```

---

### 🛠️ Build & Run

#### Run in development:

```bash
npm run dev
```

#### Compile TypeScript:

```bash
npm run build
```

#### Run compiled code:

```bash
npm start
```

---

## 📘 API Documentation

### Base URL

```
https://assignment-4-backend-ten.vercel.app
```

---

### 📚 Books Endpoints

#### 🔸 Create a Book

```
POST /api/books
```

**Request Body:**

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "NON_FICTION",
  "isbn": "1234567890",
  "description": "Improve your habits",
  "copies": 5
}
```

#### 🔹 Get All Books

```
GET /api/books
```

**Optional Query:**

* `filter=FICTION` (by genre)
* `sortBy=createdAt` or `title`
* `sort=asc` or `desc`
* `limit=5`

#### 🔹 Get Book by ID

```
GET /api/books/:bookId
```

#### 🔸 Update Book

```
PUT /api/books/:bookId
```

#### 🔻 Delete Book

```
DELETE /api/books/:bookId
```

---

### 📖 Borrowed Books Endpoints

#### 🔸 Borrow a Book

```
POST /api/borrow
```

**Request Body:**

```json
{
  "book": "bookObjectId",
  "quantity": 2,
  "dueDate": "2025-06-30"
}
```

**Business Logic:**

* Prevents borrow if copies are not available
* Automatically updates `copies` count
* Updates `available: false` if copies reach zero

#### 🔹 Borrowed Summary (Aggregation)

```
GET /api/borrow
```

**Response:**

```json
[
  {
    "book": {
      "title": "Atomic Habits",
      "isbn": "1234567890"
    },
    "totalQuantity": 4
  }
]
```

---

## ⚠️ Error Handling

* **Validation Error Example:**

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "copies": {
      "message": "Copies must be a positive number"
    }
  }
}
```

* Business logic is enforced via:

  * Mongoose **pre-save middleware**
  * **Instance methods** for updating copies


---

## 🚀 Deployment (Vercel)

#### `vercel.json`

```json
{
  "version": 2,
  "builds": [
    { "src": "dist/server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "dist/server.js" }
  ]
}
```

Build before deploy:

```bash
npm run build
```

Then push to GitHub + connect repo to [vercel.com](https://vercel.com)


