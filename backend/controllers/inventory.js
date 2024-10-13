const Inventory = require("../models/inventory");

exports.createStock = async (req, res) => {
  const { productCode, initialStock } = req.body;

  try {
    const isExistInventory = await Inventory.findOne({ productCode });

    if (isExistInventory) {
      return res.status(400).json({
        message: "Inventory for this product already exists",
      });
    }

    const inventory = await Inventory.create({
      productCode,
      currentStock: initialStock,
      stockAdded: [{ addedQuantity: initialStock }],
      stockDeducted: [],
    });

    return res.status(201).json({
      message: "Stock created successfully",
      data: inventory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.addStock = async (req, res) => {
  const { productCode, addedQuantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ productCode });

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory for this product not found",
      });
    }

    inventory.currentStock += addedQuantity;
    inventory.stockAdded.push({ addedQuantity });

    await inventory.save();

    return res.status(200).json({
      message: "Stock added successfully",
      data: inventory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deductStock = async (req, res) => {
  const { productCode, deductedQuantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ productCode });

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory for this product not found",
      });
    }

    if (inventory.currentStock < deductedQuantity) {
      return res.status(400).json({
        message: "Not enough stock to deduct",
      });
    }

    inventory.currentStock -= deductedQuantity;
    inventory.stockDeducted.push({ deductedQuantity });

    await inventory.save();

    return res.status(200).json({
      message: "Stock deducted successfully",
      inventory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getTotalStock = async (req, res) => {
  try {
    const stock = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$currentStock" },
        },
      },
    ]);

    return res.status(200).json({
      message: "Total Stock",
      data: stock[0] ? stock[0].totalStock : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getStock = async (req, res) => {
  const { productCode } = req.params;
  try {
    const stock = await Inventory.findOne({ productCode });

    if (!stock) {
      return res.status(404).json({
        message: "This product has no stock",
      });
    }

    return res.status(200).json({
      message: "Stock retrieved",
      data: stock,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
