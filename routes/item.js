const { Router } = require("express");
const router = Router();
const itemController = require("../controllers/item");

router
  .route("/")
  .post(itemController.addItem)
  .get(itemController.getAllAvailableItems);

router
  .route("/:id")
  .put(itemController.ChangeItemStatus)
  .delete(itemController.deleteItem);

router.route("/totalRevenue").get(itemController.getTotalRevenue);

module.exports = router;
