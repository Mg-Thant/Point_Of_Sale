const express = require("express");

const invoiceController = require("../controllers/invoice");
const validateInvoice = require("../middlewares/validateInvoice");

const router = express.Router();

router.post("/", validateInvoice, invoiceController.createInvoice);

router.get("/", invoiceController.getAllSaleInvoice);

router.get("/saleInvoiceId", invoiceController.getSaleInvoice);

router.post(
  "/sync-sales",
  validateInvoice,
  invoiceController.offlineSyncedSales
);

module.exports = router;
