const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { type: String, unique: true, required: true },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;