const Product = require("../models/product");
const Category = require("../models/category");

exports.createProduct = async (req, res) => {
  const { productCode, categoryCode, productName, price } = req.body;
  try {
    const isProductSame = await Product.findOne({ productCode });
    const isCategoryCodeExists = await Category.findOne({ categoryCode });

    if (isProductSame) {
      return res.status(400).json({
        message: "Product code already exists",
      });
    }

    if(!isCategoryCodeExists) {
      return res.status(400).json({
        message: "Invalid product category code",
      })
    }

    const product = await Product.create({
      productCode,
      categoryCode,
      productName,
      price,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    return res.status(200).json({
      message: "Products found",
      dat: products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product found",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;
  try {
    const isProductExist = await Product.findById(productId);

    if (!isProductExist) {
      return res.status(404).json({
        message: "Product does not exists",
      });
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    return res.status(202).json({
      message: "Product destroy",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
