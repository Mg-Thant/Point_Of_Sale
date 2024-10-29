const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  const { categoryCode, categoryName } = req.body;
  try {
    const isCategoryCodeExists = await Category.findOne({ categoryCode });

    if (isCategoryCodeExists) {
      return res.status(400).json({
        message: "This category code already exists",
      });
    }

    const newCategory = await Category.create({
      categoryCode,
      categoryName,
    });

    return res.status(201).json({
      message: "Category created",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Product found",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryCode, categoryName } = req.body;
  try {
    const isCategoryExists = await Category.findById(categoryId);

    if (!isCategoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryCode, categoryName },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const isCategoryExists = await Category.findById(categoryId);

    if (!isCategoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
