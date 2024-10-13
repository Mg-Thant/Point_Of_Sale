const express = require("express");

const inventoryController = require("../controllers/inventory");
const validateInventory = require("../middlewares/validateInventory");

const router = express.Router();

router.post("/createStock", validateInventory, inventoryController.createStock);

router.post("/addStock", validateInventory, inventoryController.addStock);

router.post("/deductStock", validateInventory, inventoryController.deductStock);

router.get("/", inventoryController.getTotalStock);

router.get("/:productCode", inventoryController.getStock);

module.exports = router;
