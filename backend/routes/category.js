const express = require("express");

const categoryController = require("../controllers/category");
const validateCategoryData = require("../middlewares/validateCategoryData");

const router = express.Router();

// Create category
// POST /api/category
router.post("/", validateCategoryData, categoryController.createCategory);

// Get category
// GET /api/category
router.get("/", categoryController.getCategories);

// Update category
// PATCH /api/category
router.patch("/", validateCategoryData, categoryController.updateCategory);

// Delete category
// DELETE /api/category
router.delete("/", categoryController.deleteCategory);

module.exports = router;
