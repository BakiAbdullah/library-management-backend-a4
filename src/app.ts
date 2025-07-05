import express, { Application, Request, Response } from "express";
import cors from "cors";
import { booksRoutes } from "./app/controller/books.controller";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://library-management-app-two-sepia.vercel.app"],
  })
);

app.use("/api", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App!");
});

export default app;
