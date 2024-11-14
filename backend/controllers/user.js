const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

exports.register = async (req, res) => {
  const { name, email, password, position } = req.body;
  try {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      position,
    });

    return res.status(201).json({
      message: "User has created",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid user credentials",
      });
    }

    if (user.status === "pending") {
      return res.status(400).json({
        message: "You are not approved. Please wait admin approved",
      });
    }

    const jwt_token = jwt.sign({ userID: user._id }, process.env.JWT_KEY);

    return res.status(200).json({
      message: "Login success",
      token: jwt_token,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
