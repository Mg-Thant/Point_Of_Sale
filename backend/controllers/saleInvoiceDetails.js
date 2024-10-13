const SaleInvoiceDetails = require("../models/saleInvoiceDetails");
const Product = require("../models/product");
const getNextSequenceVal = require("./counter");
const Inventory = require("../models/inventory");

exports.createSaleInvoiceDetails = async (req, res) => {
  const { productCode, quantity, price, amount } = req.body;

  try {
    const isProductCodeExists =
      (await Product.findOne({ productCode })) &&
      (await Inventory.findOne({ productCode }));
    const inventory = await Inventory.findOne({ productCode });

    if (!isProductCodeExists) {
      return res.status(404).json({
        message: "Invalid product code",
      });
    }

    if (inventory.currentStock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock for this product",
      });
    }

    inventory.currentStock -= quantity;
    await inventory.save();

    const voucherNo = await getNextSequenceVal("voucherNo");

    const saleInvoiceDetails = await SaleInvoiceDetails.create({
      voucherNo,
      productCode,
      quantity,
      price,
      amount,
    });

    return res.status(201).json({
      message: "Sale invoice details created successfully",
      data: saleInvoiceDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllSaleInvoiceDetails = async (req, res) => {
  try {
    const saleInvoiceDetails = await SaleInvoiceDetails.find().sort({
      createdAt: -1,
    });

    if (!saleInvoiceDetails) {
      return res.status(404).json({
        message: "Sale invoice details not found",
      });
    }

    return res.status(200).json({
      message: "Sale invoice details found",
      data: saleInvoiceDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSaleInvoiceDetails = async (req, res) => {
  const { saleInvoiceId } = req.params;

  try {
    const saleInvoiceDetails = await SaleInvoiceDetails.findById(saleInvoiceId);

    if (!saleInvoiceDetails) {
      return res.status(404).json({
        message: "Sale invoice details not found",
      });
    }

    return res.status(200).json({
      message: "Sale invoice details found",
      data: saleInvoiceDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateSaleInvoiceDetails = async (req, res) => {
  const { saleInvoiceId } = req.params;
  const updateData = req.body;

  try {
    const isSaleInvoiceExists = await SaleInvoiceDetails.findById(
      saleInvoiceId
    );

    if (!isSaleInvoiceExists) {
      return res.status(404).json({
        message: "Sale invoice details not found",
      });
    }

    const saleInvoiceDetails = await SaleInvoiceDetails.findByIdAndUpdate(
      saleInvoiceId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Sale invoice details updated successfully",
      data: saleInvoiceDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteSaleInvoiceDetails = async (req, res) => {
  const { saleInvoiceId } = req.params;

  try {
    const isSaleInvoiceExists = await SaleInvoiceDetails.findById(
      saleInvoiceId
    );

    if (!isSaleInvoiceExists) {
      return res.status(404).json({
        message: "Sale invoice details not found",
      });
    }

    await SaleInvoiceDetails.findByIdAndDelete(saleInvoiceId);

    return res.status(202).json({
      message: "Sale invoice details deletedd successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
