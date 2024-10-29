const express = require("express");

const inventoryController = require("../controllers/inventory");
const validateInventory = require("../middlewares/validateInventory");

const router = express.Router();

router.post("/createStock", validateInventory, inventoryController.createStock);

router.post("/addStock", validateInventory, inventoryController.addStock);

router.post("/deductStock", validateInventory, inventoryController.deductStock);

router.get("/getTotalStock", inventoryController.getTotalStock);

router.get("/getStock/:productCode/:shopId?", inventoryController.getStock);

router.get("/getExpiredItems", inventoryController.getExpiredItems);

module.exports = router;
