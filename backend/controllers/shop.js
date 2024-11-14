const Shop = require("../models/shop");

exports.createShop = async (req, res) => {
  const { shopCode, shopName, mobileNumber, address } = req.body;
  try {
    const isShopCodeSame = await Shop.findOne({ shopCode });

    if (isShopCodeSame) {
      return res.status(400).json({
        message: "Shop code already exists",
      });
    }

    const shop = await Shop.create({
      shopCode,
      shopName,
      mobileNumber,
      address,
    });

    return res.status(201).json({
      message: "Shop has created",
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });

    if (!shops) {
      return res.status(404).json({
        message: "Shop does not exists",
      });
    }

    return res.status(200).json({
      message: "Shops found",
      data: shops,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getShop = async (req, res) => {
  const { shopId } = req.params;
  try {
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({
        message: "Shop does not exist",
      });
    }

    return res.status(200).json({
      message: "Shop found",
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateShop = async (req, res) => {
  const { shopId } = req.params;
  const updateData = req.body;
  try {
    const isShopExists = await Shop.findOne({ _id: shopId });

    if (!isShopExists) {
      return res.status(404).json({
        message: "Shop does not exists",
      });
    }

    const shop = await Shop.findByIdAndUpdate(shopId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Shop updated successfully",
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteShop = async (req, res) => {
  const { shopId } = req.params;
  try {
    const shop = await Shop.findOne({ _id: shopId });

    if (!shop) {
      return res.status(404).json({
        message: "Shop does not exists",
      });
    }

    await Shop.findByIdAndDelete(shopId);

    return res.status(202).json({
      message: "Shop destroy",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
