const express = require("express");

const productController = require("../controllers/product");
const validateProduct = require("../middlewares/validateProductData");

const router = express.Router();

// Create Products
// POST /api/products/create-product
router.post(
  "/create-product",
  validateProduct,
  productController.createProduct
);

// getAllProducts
// GET /api/products/getProducts
router.get("/getProducts", productController.getProducts);

// getProduct
// GET /api/products/getProduct/:productId
router.get("/getProduct/:productId", productController.getProduct);

// updateProduct
// PATCH /api/products/update-product/:productId
router.patch(
  "/update-product/:productId",
  validateProduct,
  productController.updateProduct
);

// deleteProduct
// DELETE /api/products/delete-product/:productId
router.delete("/delete-product/:productId", productController.deleteProduct);

module.exports = router;
