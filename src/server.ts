import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;
// const PORT = "https://assignment-3-xi-kohl.vercel.app";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB with mongoose!");
    server = app.listen(config.port, () => {
      console.log(`Library app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
