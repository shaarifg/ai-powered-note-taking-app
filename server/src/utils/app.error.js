export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Only handle operational errors
    Error.captureStackTrace(this, this.constructor);
  }
}
