import ErrorRequestHandler from "express-error";
import ValidationError from "yup";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    let errors = {};

    error.inner.forEach((error) => {
      errors[error.path] = error.message;
    });

    return res.status(400).json({ message: "Validation failed", errors });
  }
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
