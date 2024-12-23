const express = require("express");

const shopController = require("../controllers/shop");
const validateShopData = require("../middlewares/validateShop");
const isManager = require("../middlewares/isManager");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Create shop
// POST /api/shop/create-shop
router.post(
  "/create-shop",
  isManager,
  validateShopData,
  shopController.createShop
);

// Get all shop
// GET /api/shop/getShops
router.get("/getShops", isManager, shopController.getShops);

// Get shop
// GET /api/shop/getShop/:shopId
router.get("/getShop/:shopId", isManager, shopController.getShop);

// Update shop
// PATCH /api/shop/update-shop/:shopId
router.patch(
  "/update-shop/:shopId",
  isManager,
  validateShopData,
  shopController.updateShop
);

// Delete shop
// DELETE /api/shop/delete-shpop/:shopId
router.delete("/delete-shop/:shopId", isAdmin, shopController.deleteShop);

module.exports = router;
