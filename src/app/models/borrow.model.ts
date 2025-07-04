import { model, Schema } from "mongoose";
import { IBorrowBooks } from "../interfaces/books.interface";
import { Books } from "./books.model";

const borrowBookSchema = new Schema<IBorrowBooks>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    quantity: { type: Number, required: true },
    dueDate: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//& Step-2 checking availability and decreasing a book before borrowing
borrowBookSchema.pre("save", async function (next) {
  const book = await Books.findOne({ _id: this.book._id });
  // Checking if the book and enough quantity available
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available for this book");
  }
  await book.decreaseBookCopies(this.quantity);
  next();
});

export const BorrowedBook = model<IBorrowBooks>(
  "BorrowedBook",
  borrowBookSchema
);
