import AppError from "../utils/apiError.js";
const handleJwtInvalidSignature = () =>
  new AppError("Invalid token. Please log in again!", 401);
const handleJwtExpired = () =>
  new AppError("Expired token, please login again..", 401);

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    // if you want to return the log error use > stack:err.stack
  });
};

const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const globalError = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging purposes
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();

    sendErrorForProd(err, res);
  }
};
export default globalError;
