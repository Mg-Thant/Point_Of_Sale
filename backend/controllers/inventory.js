const Inventory = require("../models/inventory");
const Shop = require("../models/shop");

exports.createStock = async (req, res) => {
  const { productCode, initialStock, shopId } = req.body;

  try {
    const isExistShop = await Shop.findOne({ _id: shopId });
    const existingInventory = await Inventory.findOne({ productCode, shop: shopId });

    if (!isExistShop) {
      return res.status(404).json({
        message: "Shop does not exists",
      });
    }

    if (existingInventory) {
      return res.status(409).json({
        message: "This product already exists in the inventory for this shop",
      });
    }

    const inventory = await Inventory.create({
      productCode,
      shop: shopId,
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
  const { productCode, addedQuantity, shopId } = req.body;

  try {
    const inventory =
      (await Inventory.findOne({ productCode })) &&
      (await Shop.findOne({ _id: shopId }));

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
  const { productCode, deductedQuantity, shopId } = req.body;

  try {
    const inventory =
      (await Inventory.findOne({ productCode })) &&
      (await Shop.findOne({ _id: shopId }));

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
  const { productCode, shopId } = req.params;
  try {
    let stock;
    if (productCode && shopId) {
      stock = await Inventory.findOne({ productCode, shop: shopId })
        .select("productCode shop currentStock lastUpdated")
        .populate("shop", "shopCode shopName address");
    } else if (productCode) {
      stock = await Inventory.find({ productCode })
        .select("productCode shop currentStock lastUpdated")
        .populate("shop", "shopCode shopName address");
    }

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
