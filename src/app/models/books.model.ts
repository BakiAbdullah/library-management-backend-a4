import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBooks } from "../interfaces/books.interface";

const booksSchema = new Schema<
  IBooks,
  Model<IBooks, {}, BookInstanceMethods>,
  BookInstanceMethods
>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
      },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//& Step-3 instance method will call after pre-save hook
booksSchema.method("decreaseBookCopies", async function (quantity: number) {
  // Decresing quantity
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.available = false;
  }
  await this.save();
});

//& Adding Instance on model
export const Books = model<IBooks, Model<IBooks, {}, BookInstanceMethods>>(
  "Books",
  booksSchema
);
