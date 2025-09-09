import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  process.exit(1);
});
