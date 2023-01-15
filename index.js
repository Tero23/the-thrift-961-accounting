require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!!! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const express = require("express");
const app = express();
const globalErrorHandler = require("./controllers/error");
const itemRouter = require("./routes/item");
const AppError = require("./utils/appError");

// app.use(express.static("public"));

// app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/items", itemRouter);

app.get("/", (req, res) => {
  res.send("Hello Serly and Tro");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App listening on port: ${port}`));

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});
