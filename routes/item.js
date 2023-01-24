const { Router } = require("express");
const router = Router();
const itemController = require("../controllers/item");

router
  .route("/")
  .post(itemController.addItem)
  .get(itemController.getAllAvailableItems);

router
  .route("/:id")
  .patch(itemController.ChangeItemStatus)
  .delete(itemController.deleteItem);

router.route("/totalRevenue").get(itemController.getTotalRevenue);
router.route("/totalCost").get(itemController.getTotalCost);

module.exports = router;
