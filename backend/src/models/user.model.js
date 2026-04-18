const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username already exists"],
    required: true,
  },

  email: {
    
    type: String,
    unique: [true, "Email already exists"],
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
