const SaleInvoice = require("../models/saleInvoice");
const SaleInvoiceDetails = require("../models/saleInvoiceDetails");
const Inventory = require("../models/inventory");
const Staff = require("../models/staff");

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await SaleInvoice.aggregate([
      {
        $group: { _id: null, totalAmount: { $sum: "$totalAmount" } },
      },
    ]);

    return res.status(200).json({
      message: "Generate total sales",
      data: totalSales[0]?.totalAmount || 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Intenal server error",
    });
  }
};

exports.getTopSellingProducts = async (req, res) => {
  try {
    const topSellingProducts = await SaleInvoiceDetails.aggregate([
      {
        $unwind: "$productSummary",
      },
      {
        $group: {
          _id: "$productSummary.productCode",
          totalQuantity: {
            $sum: "$productSummary.quantity",
          },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "productCode",
          as: "productDetails",
        },
      },
    ]);

    return res.status(200).json({
      message: "Generate top selling product",
      data: topSellingProducts[0] ? topSellingProducts : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSalesByPaymentType = async (req, res) => {
  const paymentType = req.params.type;

  try {
    const salesByPaymentType = await SaleInvoice.aggregate([
      {
        $match: {
          paymentType: paymentType,
        },
      },
      {
        $group: {
          _id: "$paymentType",
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    return res.status(200).json({
      message: `Generate sales by payment type with ${paymentType}`,
      data: salesByPaymentType[0]?.totalSales || 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Inventory.aggregate([
      {
        $match: {
          $expr: { $lt: ["$currentStock", "$minimumStock"] },
        },
      },
    ]);

    return res.status(200).json({
      message: "Low stock product found",
      data: lowStockProducts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSalesByEmployee = async (req, res) => {
  try {
    const { staffCode } = req.params;

    const isExistStaff = await Staff.findOne({ staffCode });

    if (!isExistStaff) {
      return res.status(404).json({
        message: "Stafff Code does not exists",
      });
    }

    const employeeSales = await SaleInvoice.aggregate([
      {
        $match: { staffCode },
      },
      {
        $group: { _id: "$staffCode", totalSales: { $sum: "$totalAmount" } },
      },
    ]);

    return res.status(200).json({
      message: "Generate sales by employee",
      data: employeeSales.length > 0 ? employeeSales : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getTopEmployee = async (req, res) => {
  try {
    const topEmployee = await SaleInvoice.aggregate([
      {
        $group: {
          _id: "$staffCode",
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json({
      message: "Generate top employee",
      data: topEmployee.length > 0 ? topEmployee : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const topCustomer = await SaleInvoice.aggregate([
      {
        $group: {
          _id: "$customerAccountNo",
          totalSpent: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { totalSpent: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json({
      message: "Generate top customers",
      data: topCustomer.length > 0 ? topCustomer : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCashFlow = async (req, res) => {
  try {
    const cashFlow = await SaleInvoice.aggregate([
      {
        $match: { paymentType: "cash" },
      },
      {
        $group: {
          _id: null,
          totalCash: {
            $sum: "$receivedAmount",
          },
        },
      },
    ]);

    return res.status(200).json({
      message: "Generate cash flow",
      data: cashFlow.length > 0 ? cashFlow : 0,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getProfitMargins = async (req, res) => {
  try {
    const profitMargins = await SaleInvoiceDetails.aggregate([
      { $unwind: "$productSummary" },
      {
        $lookup: {
          from: "products",
          localField: "productSummary.productCode",
          foreignField: "productCode",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $addFields: {
          sellPrice: "$productSummary.price",
          costPrice: "$productDetails.costPrice",
          profitMargin: {
            $subtract: ["$productSummary.price", "$productDetails.costPrice"],
          },
        },
      },
      {
        $project: {
          productCode: "$productSummary.productCode",
          sellPrice: 1,
          costPrice: 1,
          profitMargin: 1,
          quantitySold: "$productSummary.quantity",
        },
      },
    ]);

    if (!profitMargins.length) {
      return res.status(404).json({ message: "No profit margins found" });
    }

    console.log(profitMargins);

    return res.status(200).json({
      message: "Profit margins generated successfully",
      data: profitMargins,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
