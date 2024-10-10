const SaleInvoice = require("../models/saleInvoice");
const getNextSequenceVal = require("../controllers/counter");
const Product = require("../models/product");
const Staff = require("../models/staff");
const Shop = require("../models/shop");

exports.createSaleInvoice = async (req, res) => {
  const {
    staffCode,
    shopCode,
    productCode,
    quantity,
    price,
    totalAmount,
    discount,
    tax,
    paymentType,
    customerAccountNo,
    paymentAmount,
    receivedAmount,
    change,
  } = req.body;

  try {
    const isProductCodeExists = await Product.findOne({ productCode });
    const isStaffCodeExists = await Staff.findOne({ staffCode });
    const isShopCodeExists = await Shop.findOne({ shopCode });

    if (!isProductCodeExists) {
      return res.status(400).json({
        message: "Invalid product code",
      });
    }

    if (!isStaffCodeExists) {
      return res.status(400).json({
        message: "Invalid staff code",
      });
    }

    if (!isShopCodeExists) {
      return res.status(400).json({
        message: "Invalid shop code",
      });
    }

    // auto-increment voucherNo.
    const voucherNo = await getNextSequenceVal("voucherNo");

    const saleInvoice = await SaleInvoice.create({
      voucherNo,
      staffCode,
      shopCode,
      productCode,
      quantity,
      price,
      totalAmount,
      discount,
      tax,
      paymentType,
      customerAccountNo,
      paymentAmount,
      receivedAmount,
      change,
    });

    return res.status(201).json({
      message: "Sale invoice created successfully",
      data: saleInvoice,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllSaleInvoice = async (req, res) => {
  try {
    const saleInvoice = await SaleInvoice.find().sort({ createdAt: -1 });

    if (!saleInvoice) {
      return res.status(404).json({
        message: "Sale Invoice not found",
      });
    }

    return res.status(200).json({
      message: "Sale Invoice found",
      data: saleInvoice,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSaleInvoice = async (req, res) => {
  const { saleInvoiceId } = req.params;
  try {
    const saleInvoice = await SaleInvoice.findById(saleInvoiceId);

    if (!saleInvoice) {
      return res.status(404).json({
        message: "Sale Invoice not found",
      });
    }

    return res.status(200).json({
      message: "Sale Invoice found",
      data: saleInvoice,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateSaleInvoice = async (req, res) => {
  const { saleInvoiceId } = req.params;
  const updateData = req.body;
  try {
    const isSaleInvoiceExists = await SaleInvoice.findById(saleInvoiceId);

    if (!isSaleInvoiceExists) {
      return res.status(404).json({
        message: "Sale invoice not found",
      });
    }

    const saleInvoice = await SaleInvoice.findByIdAndUpdate(
      saleInvoiceId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Sale invoice updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteSaleInvoice = async (req, res) => {
  const { saleInvoiceId } = req.params;
  try {
    const isSaleInvoiceExists = await SaleInvoice.findById(saleInvoiceId);

    if (!isSaleInvoiceExists) {
      return res.status(404).json({
        message: "Sale Invoice not found",
      });
    }

    await SaleInvoice.findByIdAndDelete(saleInvoiceId);

    return res.status(202).json({
      message: "Sale invoice destroy successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
