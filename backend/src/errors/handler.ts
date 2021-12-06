import e, { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      if (err.path) errors[err.path] = err.errors;
    });
    return res.status(400).json({ message: "Validation fails", errors });
  }

  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
