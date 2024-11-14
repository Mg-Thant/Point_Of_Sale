const express = require("express");

const inventoryController = require("../controllers/inventory");
const validateInventory = require("../middlewares/validateInventory");
const isManager = require("../middlewares/isManager");
const isCashier = require("../middlewares/isCashier");

const router = express.Router();

router.post(
  "/createStock",
  isManager,
  validateInventory,
  inventoryController.createStock
);

router.post(
  "/addStock",
  isManager,
  validateInventory,
  inventoryController.addStock
);

router.post(
  "/deductStock",
  isManager,
  validateInventory,
  inventoryController.deductStock
);

router.get("/getTotalStock", isCashier, inventoryController.getTotalStock);

router.get(
  "/getStock/:productCode/:shopId?",
  isCashier,
  inventoryController.getStock
);

router.get("/getExpiredItems", isCashier, inventoryController.getExpiredItems);

module.exports = router;
