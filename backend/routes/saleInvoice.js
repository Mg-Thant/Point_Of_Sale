const express = require("express");

const saleInvoiceController = require("../controllers/saleInvoice");
const validateSaleInvoiceData = require("../middlewares/validateSaleInvoiceData");

const router = express.Router();

// Create SaleInvoice
// POST /api/saleInvoice
router.post(
  "/",
  validateSaleInvoiceData,
  saleInvoiceController.createSaleInvoice
);

// Get All SaleInvoice
// GET /api/saleInvoice
router.get("/", saleInvoiceController.getAllSaleInvoice);

// Get SaleInvoice
// GET /api/saleInvoice/:saleInvoiceId
router.get("/:saleInvoiceId", saleInvoiceController.getSaleInvoice);

// Delete SaleInvoice
// DELETE /api/saleInvoice/saleInvoiceId
router.delete("/:saleInvoiceId", saleInvoiceController.deleteSaleInvoice);

// Update SaleInvoice
// PATCH /api/saleInvoice/:saleInvoiceId
router.patch(
  "/:saleInvoiceId",
  validateSaleInvoiceData,
  saleInvoiceController.updateSaleInvoice
);

module.exports = router;
