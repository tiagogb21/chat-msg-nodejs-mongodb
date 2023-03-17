import "express-async-errors";
import express, { ErrorRequestHandler } from "express";
import { MongoClient } from "mongodb";

import Router from "./routes";
import ErrorHandler from "./utils/ErrorHandler";

const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/Chat";

const dbClient = new MongoClient(mongoUrl);
const errorHandler = new ErrorHandler(dbClient);
const handleError: ErrorRequestHandler = errorHandler.handleError();

const app = express();
app.use(express.json());
app.use(Router);
app.use(handleError);

export default app;
