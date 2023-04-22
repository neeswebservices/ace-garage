class APPError extends Error {
  constructor(message = "Something went wrong", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOptional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APPError;
