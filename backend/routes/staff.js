const express = require("express");

const staffController = require("../controllers/staff");
const validateStaffData = require("../middlewares/validateStaffData");

const router = express.Router();

// Create Staff
// POST /api/staff
router.post("/", validateStaffData, staffController.creatStaff);

// Get All Staff
// GET /api/staff
router.get("/", staffController.getAllStaff);

// Get Staff
// GET /api/staff/:staffId
router.get("/:staffId", staffController.getStaff);

// Update Staff
// PATCH /api/staff/update-staff/:staffId
router.patch(
  "/update-staff/:staffId",
  validateStaffData,
  staffController.updateStaff
);

// Delete Staff
// DELETE /api/staff/delete-staff/:staffId
router.delete("/delete-staff/:staffId", staffController.deleteStaff);

module.exports = router;
