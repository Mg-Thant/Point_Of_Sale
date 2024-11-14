const SaleInvoice = require("../models/saleInvoice");
const SaleInvoiceDetails = require("../models/saleInvoiceDetails");
const getNextSequenceVal = require("../controllers/counter");
const Staff = require("../models/staff");
const Shop = require("../models/shop");
const Product = require("../models/product");
const Inventory = require("../models/inventory");
const Customer = require("../models/customer");
const { Types } = require("mongoose");

exports.applyLoyaltyPoint = async (req, res) => {
  const { customerAccountNo, redeemPoints } = req.body;
  try {
    const customer = await Customer.findOne({
      customerAccountNo,
    });

    if (customer.loyaltyPoints < redeemPoints) {
      return res.status(400).json({
        message: "Insufficient points",
      });
    }

    const discountAmount = redeemPoints * 300; // 100 points = 30000
    await Customer.findOneAndUpdate(
      { customerAccountNo },
      {
        $inc: { loyaltyPoints: -redeemPoints },
      }
    );

    return { discountAmount };
  } catch (err) {
    return err;
  }
};

exports.createInvoice = async (req, res) => {
  const {
    staffCode,
    shopId,
    totalAmount,
    discount = 0,
    tax,
    paymentType,
    customerAccountNo,
    receivedAmount,
    products,
    redeemPoints = 0,
  } = req.body;

  try {
    const isStaffExists = await Staff.findOne({ staffCode });
    const isShopExists = await Shop.findOne({ _id: shopId });
    const isCustomerExists = await Customer.findOne({ customerAccountNo });
    const loyaltyPoints = Math.floor(totalAmount / 3000);

    const objShopId = new Types.ObjectId(shopId);

    if (!isStaffExists || !isShopExists) {
      return res.status(404).json({
        message: `Invalid ${!isStaffExists ? "staff code" : "shopId"}`,
      });
    }

    if (redeemPoints === 0) {
      if (!isCustomerExists) {
        await Customer.create({
          customerAccountNo,
          loyaltyPoints,
        });
      } else {
        await Customer.updateOne(
          { customerAccountNo },
          { $inc: { loyaltyPoints } },
          { new: true }
        );
      }
    }

    await Promise.all(
      products.map(async (product) => {
        const productExists = await Product.findOne({
          productCode: product.productCode,
        });
        const inventory = await Inventory.findOne({
          productCode: product.productCode,
          shop: objShopId,
        });

        if (!productExists) {
          return res.status(404).json({
            message: `Product with code ${product.productCode} does not exist`,
          });
        }

        if (!inventory) {
          return res.status(404).json({
            message: `Inventory for product with code ${product.productCode} does not exist in shop ${shopId}`,
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

    let disAmount = discount;
    let finalAmount = totalAmount;
    if (redeemPoints > 0) {
      const discountRes = await exports.applyLoyaltyPoint({
        body: {
          customerAccountNo,
          redeemPoints,
        },
      });
      if (discountRes && discountRes.discountAmount) {
        disAmount += discountRes.discountAmount;
        finalAmount -= discountRes.discountAmount;
      }
    }

    const saleInvoice = await SaleInvoice.create({
      staffCode,
      shop: shopId,
      voucherNo,
      totalAmount: finalAmount,
      discount: disAmount,
      tax,
      paymentType,
      customerAccountNo,
      paymentAmount: finalAmount + tax,
      receivedAmount,
      change: receivedAmount - (finalAmount + tax),
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
    const saleInvoice = await SaleInvoice.find()
      .sort({ createdAt: -1 })
      .populate("saleInvoiceDetails");

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

exports.offlineSyncedSales = async (req, res) => {
  const salesData = req.body.sales;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    for (const sale of salesData) {
      const isStaffExists = await Staff.findOne({ staffCode: sale.staffCode });
      const isProductExists = await Product.findOne({
        productCode: sale.productCode,
      });
      const inventory = await Inventory.findOne({
        productCode: sale.productCode,
        shop: sale.shopId,
      });
      const isCustomerExists = await Customer.findOne({
        customerAccountNo: sale.customerAccountNo,
      });
      // calculate loyaltyPoints for every 5000 spent
      const loyaltyPoints = Math.floor(sale.totalAmount / 5000);

      if (!isStaffExists || !isProductExists || !inventory) {
        return res.status(404).json({
          message: `Invalid ${
            !isStaffExists
              ? "staff code"
              : !inventory
              ? `${sale.productCode}`
              : "product code"
          }`,
        });
      }

      if (sale.redeemPoints === 0) {
        if (!isCustomerExists) {
          await Customer.create(
            { customerAccountNo: sale.customerAccountNo, loyaltyPoints },
            { session }
          );
        } else {
          await Customer.updateOne(
            { customerAccountNo: sale.customerAccountNo },
            { $inc: { loyaltyPoints } },
            { session }
          );
        }
      }

      // generate voucher no
      const voucherNo = await getNextSequenceVal("voucherNo");

      // Sale Invoice details create
      const saleInvoiceDetails = await SaleInvoiceDetails.create(
        {
          voucherNo,
          productSummary: {
            productCode: sale.productCode,
            quantity: sale.quantity,
            price: sale.price,
            amount: sale.amount,
          },
        },
        { session }
      );

      let disAmount = sale.discount;
      let finalAmount = sale.totalAmount;
      if (redeemPoints > 0) {
        const discountRes = await exports.applyLoyaltyPoint({
          body: {
            customerAccountNo: sale.customerAccountNo,
            redeemPoints: sale.redeemPoints,
          },
        });
        if (discountRes && discountRes.discountAmount) {
          disAmount += discountRes.discountAmount;
          finalAmount -= discountRes.discountAmount;
        }
      }

      // Sale invoice create
      const saleInvoice = await SaleInvoice.create(
        {
          staffCode: sale.staffCode,
          shop: sale.shopId,
          voucherNo,
          totalAmount: finalAmount,
          discount: disAmount,
          tax: sale.tax,
          paymentType: sale.paymentType,
          customerAccountNo: sale.customerAccountNo,
          paymentAmount: finalAmount + sale.tax,
          receivedAmount: sale.receivedAmount,
          change:
            receivedAmount - (finalAmount + sale.tax),
          saleInvoiceDetails: saleInvoiceDetails._id,
        },
        { session }
      );

      // Inventory update
      inventory.currentStock -= sale.quantity;
      await inventory.save();
    }

    await session.commitTransaction();

    return res.status(200).json({
      message: "Sale synced successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};
