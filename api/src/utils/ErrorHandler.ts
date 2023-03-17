import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { MongoClient } from "mongodb";

class ErrorHandler {
  private dbClient: MongoClient;

  constructor(dbClient: MongoClient) {
    this.dbClient = dbClient;
  }

  public handleError(): ErrorRequestHandler {
    return async (err, req, res, next) => {
      try {
        const db = this.dbClient.db("Chat");

        const collection = db.collection("Verify");

        const a = await collection.insertOne({
          timestamp: new Date().toISOString(),
          message: err.message,
          stackTrace: err.stack,
          requestBody: req.body,
        });

        return a;
      } catch (error) {
        console.error(error);
      }

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    };
  }
}

export default ErrorHandler;
