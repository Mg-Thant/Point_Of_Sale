const express = require("express");

const productController = require("../controllers/product");
const validateProduct = require("../middlewares/validateProductData");
const isManager = require("../middlewares/isManager");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Create Products
// POST /api/products/create-product
router.post(
  "/create-product",
  isManager,
  validateProduct,
  productController.createProduct
);

// getAllProducts
// GET /api/products/getProducts
router.get("/getProducts", isManager, productController.getProducts);

// getProduct
// GET /api/products/getProduct/:productId
router.get("/getProduct/:productId", isManager, productController.getProduct);

// updateProduct
// PATCH /api/products/update-product/:productId
router.patch(
  "/update-product/:productId",
  isManager,
  validateProduct,
  productController.updateProduct
);

// deleteProduct
// DELETE /api/products/delete-product/:productId
router.delete(
  "/delete-product/:productId",
  isAdmin,
  productController.deleteProduct
);

module.exports = router;
