const Staff = require("../models/staff");
const Shop = require("../models/shop");

exports.creatStaff = async (req, res) => {
  const {
    staffCode,
    staffName,
    dateOfBirth,
    mobileNumber,
    address,
    gender,
    position,
    shopId,
  } = req.body;
  try {
    const isStaffExists = await Staff.findOne({ staffCode });
    const isShopIdExists = await Shop.findOne({ _id: shopId });

    if (isStaffExists) {
      return res.status(400).json({
        message: "Staff member code already exists",
      });
    }

    if(!isShopIdExists) {
      return res.status(400).josn({
        message: "Invalid Shop ID",
      })
    }

    await Staff.create({
      staffCode,
      staffName,
      dateOfBirth,
      mobileNumber,
      address,
      gender,
      position,
      shopId,
    });

    return res.status(201).json({
      message: "Staff member created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      message: "Staff member found",
      data: staff,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getStaff = async (req, res) => {
  const { staffId } = req.params;
  try {
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      message: "Staff member found",
      data: staff,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateStaff = async (req, res) => {
  const { staffId } = req.params;
  const updateData = req.body;
  try {
    const isStaffExists = await Staff.findById(staffId);

    if (!isStaffExists) {
      return res.status(404).json({
        message: "This staff member id does not exists",
      });
    }

    const staff = await Staff.findByIdAndUpdate(staffId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Staff member updated successfully",
      data: staff,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteStaff = async (req, res) => {
  const { staffId } = req.params;
  try {
    const isStaffExists = await Staff.findById(staffId);

    if (!isStaffExists) {
      return res.status(404).json({
        message: "This staff member id does not exists",
      });
    }

    await Staff.findByIdAndDelete(staffId);

    return res.status(202).json({
      message: "Staff member deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
