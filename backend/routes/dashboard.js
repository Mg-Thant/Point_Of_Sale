const express = require("express");

const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.get("/totalSales", dashboardController.getTotalSales);

router.get("/topSellingProducts", dashboardController.getTopSellingProducts);

router.get(
  "/salesByPaymentType/:type",
  dashboardController.getSalesByPaymentType
);

router.get("/lowStockProducts", dashboardController.getLowStockProducts);

router.get(
  "/salesByEmployee/:staffCode",
  dashboardController.getSalesByEmployee
);

router.get("/getTopCustomers", dashboardController.getTopCustomers);

router.get("/getTopEmployee", dashboardController.getTopEmployee);

router.get("/getCashFlow", dashboardController.getCashFlow);

router.get("/getProfitMargins", dashboardController.getProfitMargins);

module.exports = router;
