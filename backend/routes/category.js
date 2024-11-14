const express = require("express");

const categoryController = require("../controllers/category");
const validateCategoryData = require("../middlewares/validateCategoryData");
const isManager = require("../middlewares/isManager");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Create category
// POST /api/category
router.post(
  "/",
  isManager,
  validateCategoryData,
  categoryController.createCategory
);

// Get category
// GET /api/category
router.get("/", isManager, categoryController.getCategories);

// Update category
// PATCH /api/category
router.patch(
  "/:categoryId",
  isManager,
  validateCategoryData,
  categoryController.updateCategory
);

// Delete category
// DELETE /api/category
router.delete("/categoryId", isAdmin, categoryController.deleteCategory);

module.exports = router;
