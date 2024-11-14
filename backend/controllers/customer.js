const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  const {
    customerName,
    customerAccountNo,
    dateOfBirth,
    mobileNumber,
    stateCode = null,
    townShipCode = null,
  } = req.body;
  try {
    const isCustomerExists = await Customer.findOne({ customerAccountNo });

    if (isCustomerExists) {
      return res.status(400).json({
        message: "Customer already exists",
      });
    }

    await Customer.create({
      customerName,
      customerAccountNo,
      dateOfBirth,
      mobileNumber,
      stateCode,
      townShipCode,
    });

    return res.status(201).json({
      message: "Customer created successfylly",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers) {
      return res.status(404).json({
        message: "Customers not found",
      });
    }

    return res.status(200).json({
      message: "Customers found",
      data: customers,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer found",
      data: customer,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const {
    customerName,
    customerAccountNo,
    dateOfBirth,
    mobileNumber,
    stateCode = null,
    townShipCode = null,
  } = req.body;
  try {
    const isCustomerExists = await Customer.findById(customerId);

    if (!isCustomerExists) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      customerId,
      {
        customerName,
        customerAccountNo,
        dateOfBirth,
        mobileNumber,
        stateCode,
        townShipCode,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const isCustomerExists = await Customer.findById(customerId);

    if (!isCustomerExists) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await Customer.findByIdAndDelete(customerId);

    return res.status(202).json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
