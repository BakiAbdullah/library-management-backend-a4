import { Types } from "mongoose";

export interface IBooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

//& Step-1 (Interface)
export interface BookInstanceMethods {
  decreaseBookCopies(quantity: number): Promise<void>;
}

export interface IBorrowBooks {
  book: Types.ObjectId;
  quantity: number;
  dueDate: string;
}
