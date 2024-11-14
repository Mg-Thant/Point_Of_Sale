const express = require("express");

const dashboardController = require("../controllers/dashboard");
const isCashier = require("../middlewares/isCashier");
const isManager = require("../middlewares/isManager");

const router = express.Router();

router.get("/totalSales", isCashier, dashboardController.getTotalSales);

router.get(
  "/topSellingProducts",
  isManager,
  dashboardController.getTopSellingProducts
);

router.get(
  "/salesByPaymentType/:type",
  isManager,
  dashboardController.getSalesByPaymentType
);

router.get(
  "/lowStockProducts",
  isManager,
  dashboardController.getLowStockProducts
);

router.get(
  "/salesByEmployee/:staffCode",
  isManager,
  dashboardController.getSalesByEmployee
);

router.get("/getTopCustomers", isManager, dashboardController.getTopCustomers);

router.get("/getTopEmployee", isManager, dashboardController.getTopEmployee);

router.get("/getCashFlow", isManager, dashboardController.getCashFlow);

router.get(
  "/getProfitMargins",
  isManager,
  dashboardController.getProfitMargins
);

module.exports = router;
