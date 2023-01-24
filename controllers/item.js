const { Op, Sequelize, UUIDV4 } = require("sequelize");
const { item: Item, revenue: Revenue } = require("../models/index");
const sequelize = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Redis = require("redis");

const redisClient = Redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

redisClient
  .connect()
  .then((conn) => console.log("Redis client connected!"))
  .catch((err) => console.log(err));

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

exports.addItem = catchAsync(async (req, res, next) => {
  const { name, cost, price } = req.body;
  if (!name || !cost || !price)
    return next(new AppError("Please fill all the required fields!", 400));
  const item = await Item.create({
    name,
    cost,
    price,
  });
  const availableItems = await Item.findAll({ where: { status: "Available" } });
  await redisClient.setEx("items", 3600, JSON.stringify(availableItems));
  res.status(201).json({
    status: "success",
    message: "Item created!",
    item,
  });
});

exports.ChangeItemStatus = catchAsync(async (req, res, next) => {
  const item = await Item.findOne({ where: { id: req.params.id } });
  if (!item) return next(new AppError("There is no item with that id!", 404));
  item.status === "Sold" ? (item.status = "Available") : (item.status = "Sold");
  await item.save();
  item.status === "Sold"
    ? await Revenue.create({ itemId: item.id, amount: item.price })
    : await Revenue.destroy({ where: { itemId: item.id } });
  const availableItems = await Item.findAll({ where: { status: "Available" } });
  await redisClient.setEx("items", 3600, JSON.stringify(availableItems));
  res.status(200).json({
    message: `Item status changed to ${item.status}!`,
    item,
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findOne({ where: { id: req.params.id } });
  if (!item) return next(new AppError("There is no item with that id!", 404));
  await Item.destroy({ where: { id: item.id } });
  const availableItems = await Item.findAll({ where: { status: "Available" } });
  await redisClient.setEx("items", 3600, JSON.stringify(availableItems));
  res.sendStatus(204);
});

exports.getAllAvailableItems = catchAsync(async (req, res, next) => {
  const items = await redisClient.get("items");
  if (items != null) return res.json(JSON.parse(items));
  const newItems = await Item.findAll({
    where: { status: "Available" },
  });
  if (!newItems.length)
    return res.status(200).json({
      message: "There are no available items!",
    });
  await redisClient.setEx("items", 3600, JSON.stringify(newItems));
  process.on("SIGINT", function () {
    redisClient.quit();
    process.exit();
  });
  res.status(200).json(newItems);
});

exports.getTotalRevenue = catchAsync(async (req, res, next) => {
  const total = await Revenue.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
    ],
  });
  res.status(200).json(total[0]);
});

exports.getTotalCost = catchAsync(async (req, res, next) => {
  const total = await Item.findAll({
    attributes: [[sequelize.fn("SUM", sequelize.col("cost")), "total_cost"]],
    where: { status: "Sold" },
  });
  res.status(200).json(total[0]);
});
