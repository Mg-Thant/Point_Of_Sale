const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.position !== "admin") {
      throw new Error("Access denied");
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};
