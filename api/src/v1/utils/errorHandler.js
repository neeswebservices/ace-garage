import APPError from "./Error.js";

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") {
      error = new APPError(`Invalid ${error.path}: ${error.value}`, 400);
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      error = new APPError(`Invalid input data. ${errors.join(". ")}`, 400);
    }

    if (error.code === 11000) {
      const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      error = new APPError(`Duplicate field value: ${value}. Please use another value!`, 400);
    }

    if (!error.isOperational) {
      error = new APPError("Something went wrong!", 500);
    }

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
};

// // const errorHandler = (err, req, res, next) => {
// //   const statusCode = err.statusCode || 500;
// //   const message = err.message || "Opps ! Something went wrong ...";
// //   return res.status(statusCode).json({ message, success: false, stack: process.env.ENV === "development" ? err.stack : null });
// // };
//
export default errorHandler;
