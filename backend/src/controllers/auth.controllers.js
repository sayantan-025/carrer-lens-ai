const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

// register controller

const registerUserController = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ message: "User name, email and password are required" });
  }

  const userAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (userAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, name: user.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created",
    user: { id: user._id, name: user.userName, email: user.email },
  });
};

// login controller

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not registered with this email" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in",
    user: {
      id: user._id,
      name: user.userName,
      email: user.email,
    },
  });
};

// logout controller

const logoutUserController = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await blacklistModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({ message: "User logged out" });
};

// get-me controller

const getMeController = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      name: user.userName,
      email: user.email,
    },
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
