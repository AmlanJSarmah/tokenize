const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorName: {
    type: String,
    required: true,
  },
  accepter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isAccepted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
