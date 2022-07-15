import express from "express";
import volleyball from "volleyball";
import dotenv from "dotenv";
import { dbConnect } from "./db/connection.js";
import { notFoundHandler, errorHandler } from "./errorHandlers.js";
import router from "./api/routes.js";

// load dot env variables
dotenv.config();

// connect to database
dbConnect();

// express app
const app = express();

// http req res logger
app.use(volleyball);

// express json body parser
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.json({
    message: "server is online and ready to serve✅",
    routes: [
      { "/student": ["/add", "/all", "/assigned", "/unassigned", "/:id"] },
      { "/mentor": ["/add", "/all", "/assignments/:id", "/:id"] },
      "/assign",
      "/reassign",
    ],
  });
});

// api route
app.use("/", router);

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

export default app;
