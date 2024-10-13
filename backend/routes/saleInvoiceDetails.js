const express = require("express");

const saleInvoiceDetailsController = require("../controllers/saleInvoiceDetails");
const validateSaleInvoiceDetails = require("../middlewares/validateSaleInvoiceDetails");

const router = express.Router();

router.post(
  "/",
  validateSaleInvoiceDetails,
  saleInvoiceDetailsController.createSaleInvoiceDetails
);

router.get("/", saleInvoiceDetailsController.getAllSaleInvoiceDetails);

router.get(
  "/:saleInvoiceId",
  saleInvoiceDetailsController.getSaleInvoiceDetails
);

router.patch(
  "/:saleInvoiceId",
  validateSaleInvoiceDetails,
  saleInvoiceDetailsController.updateSaleInvoiceDetails
);

router.delete(
  "/:saleInvoiceId",
  saleInvoiceDetailsController.deleteSaleInvoiceDetails
);

module.exports = router;
