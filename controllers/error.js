require("dotenv").config();
const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (err) => {
  const message = `${err.errors[0].message}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 403);
};

// valid UUID but does not exist in the dataBase
const handleForeignKeyErrorDB = (err) => {
  const message = "The post with that id does not exist!";
  return new AppError(message, 400);
};

// datatype is UUID and has a certain length.. when an invalid uuid with longer length is set
const handleSequelizeErrorDB = (err) => {
  const message = "Invalid UUID!";
  return new AppError(message, 400);
};

const handleExpiredTokenError = (err) => {
  const message = "Token Expired! Please Relogin!";
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    // console.log("Hello", err.statusCode, err.message, err.status);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't send error details to the client
  } else {
    // console.error('ERROR!!!', err);
    res.status(500).json({
      status: "error",
      message: "Something went really wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };
    console.log(error.name);
    if (error.name === "SequelizeUniqueConstraintError")
      error = handleDuplicateFieldsDB(error);
    if (error.name === "SequelizeValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "SequelizeForeignKeyConstraintError")
      error = handleForeignKeyErrorDB(error);
    if (error.name === "SequelizeDatabaseError")
      error = handleSequelizeErrorDB(error);
    if (error.name === "TokenExpiredError")
      error = handleExpiredTokenError(error);
    sendErrorProd(error, res);
  }
};
