const express = require("express");

const staffController = require("../controllers/staff");
const validateStaffData = require("../middlewares/validateStaffData");
const isManager = require("../middlewares/isManager");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Create Staff
// POST /api/staff
router.post("/", isManager, validateStaffData, staffController.creatStaff);

// Get All Staff
// GET /api/staff
router.get("/", isManager, staffController.getAllStaff);

// Get Staff
// GET /api/staff/:staffId
router.get("/:staffId", isManager, staffController.getStaff);

// Update Staff
// PATCH /api/staff/update-staff/:staffId
router.patch(
  "/update-staff/:staffId",
  isManager,
  validateStaffData,
  staffController.updateStaff
);

// Delete Staff
// DELETE /api/staff/delete-staff/:staffId
router.delete("/delete-staff/:staffId", isAdmin, staffController.deleteStaff);

module.exports = router;
