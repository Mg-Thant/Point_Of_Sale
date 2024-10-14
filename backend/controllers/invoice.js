const SaleInvoice = require("../models/saleInvoice");
const SaleInvoiceDetails = require("../models/saleInvoiceDetails");
const getNextSequenceVal = require("../controllers/counter");
const Staff = require("../models/staff");
const Shop = require("../models/shop");
const Product = require("../models/product");
const Inventory = require("../models/inventory");

exports.createInvoice = async (req, res) => {
  const {
    staffCode,
    shopCode,
    totalAmount,
    discount,
    tax,
    paymentType,
    customerAccountNo,
    receivedAmount,
    products,
  } = req.body;

  try {
    const isStaffExists = await Staff.findOne({ staffCode });
    const isShopExists = await Shop.findOne({ shopCode });

    if (!isStaffExists || !isShopExists) {
      return res.status(404).json({
        message: `Invalid ${!isStaffExists ? "staff" : "shop"} code`,
      });
    }

    await Promise.all(
      products.map(async (product) => {
        const productExists = await Product.findOne({
          productCode: product.productCode,
        });
        const inventory = await Inventory.findOne({
          productCode: product.productCode,
        });

        if (!productExists || !inventory) {
          return res.status(404).json({
            message: `Product with code ${product.productCode} does not exist`,
          });
        }

        if (inventory.currentStock < product.quantity) {
          return res.status(404).json({
            message: `Insufficient stock for product with code ${product.productCode}`,
          });
        }

        inventory.currentStock -= product.quantity;
        await inventory.save();
      })
    );

    const voucherNo = await getNextSequenceVal("voucherNo");

    const saleInvoiceDetails = await SaleInvoiceDetails.create({
      voucherNo,
      productSummary: products.map((product) => ({
        productCode: product.productCode,
        quantity: product.quantity,
        price: product.price,
        amount: product.amount,
      })),
    });

    const saleInvoice = await SaleInvoice.create({
      staffCode,
      shopCode,
      voucherNo,
      totalAmount,
      discount,
      tax,
      paymentType,
      customerAccountNo,
      paymentAmount: totalAmount - discount + tax,
      receivedAmount,
      change: receivedAmount - (totalAmount - discount + tax),
      saleInvoiceDetails: saleInvoiceDetails._id,
    });

    return res.status(201).json({
      message: "Sale invoice created successfully",
      data: { saleInvoice, saleInvoiceDetails },
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
    const saleInvoice = await SaleInvoice.findById(saleInvoiceId).populate(
      "saleInvoiceDetails"
    );

    if (!saleInvoice) {
      return res.status(404).json({
        message: "Sale invoice not found with this ID",
      });
    }

    return res.status(200).json({
      message: "Sale invoice found",
      data: saleInvoice,
    });
  } catch (err) {
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
        message: "Sale invoice not found",
      });
    }

    return res.status(200).json({
      message: "Sale invoice found",
      data: saleInvoice,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
