const express = require("express");

const invoiceController = require("../controllers/invoice");
const validateInvoice = require("../middlewares/validateInvoice");
const isCashier = require("../middlewares/isCashier");

const router = express.Router();

router.post("/", isCashier, validateInvoice, invoiceController.createInvoice);

router.get("/", isCashier, invoiceController.getAllSaleInvoice);

router.get("/:saleInvoiceId", isCashier, invoiceController.getSaleInvoice);

router.post(
  "/sync-sales",
  isCashier,
  validateInvoice,
  invoiceController.offlineSyncedSales
);

module.exports = router;
