import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://taskly-tasks-management.vercel.app",
      "http://localhost:3000",
      "https://workspace-taskly.netlify.app",
    ],
    credentials: true,
  })
);

/* Applications routes */
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
