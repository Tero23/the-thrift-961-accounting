const express = require("express");
const app = express();
const cors = require("cors");
const globalErrorHandler = require("./controllers/error");
const itemRouter = require("./routes/item");
const AppError = require("./utils/appError");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);
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

module.exports = app;
