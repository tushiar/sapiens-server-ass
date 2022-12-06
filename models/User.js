const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default: "blue",
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("sapiens_users", UserSchema);
