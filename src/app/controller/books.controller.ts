import express, { Request, Response } from "express";
import { Books } from "../models/books.model";
import { BorrowedBook } from "../models/borrow.model";

export const booksRoutes = express.Router();

// CREATE a book
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// GET all books
booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const genre = filter?.toString().toUpperCase();
    const sortField = sortBy?.toString() || "createdAt";
    const sortOrder = sort === "asc" ? 1 : -1;

    let query: any = {};
    if (genre) {
      query.genre = genre;
    }

    let booksQuery = Books.find(query).sort({ [sortField]: sortOrder });

    if (limit) {
      const sortLimit = parseInt(limit as string);
      if (!isNaN(sortLimit)) {
        booksQuery = booksQuery.limit(sortLimit);
      }
    }

    const data = await booksQuery;

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// GET a book by ID
booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Books.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// Update a book by ID
booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const data = await Books.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully.",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// Delete a book by ID
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Books.findOneAndDelete({ _id: bookId });
    res.status(201).json({
      success: true,
      message: "Book deleted successfully.",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// Borrow a book
booksRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const borrowBookBody = req.body;
    const data = await BorrowedBook.create(borrowBookBody);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully.",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get borrow books summary (Aggregation pipeline)
booksRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const data = await BorrowedBook.aggregate([
      //stage-1
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      //stage-2
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      //stage-3
      {
        $unwind: "$book",
      },
      //stage-4
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully.",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
