const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 1, max: 50 },
    email: { type: String, required: true, unique: true },
    bio: { type: String, max: 200 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
