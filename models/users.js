const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  generatedTokens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
  ],
  acceptedTokens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
  ],
});

userSchema.methods.addToken = function (tokenId, isGenerated) {
  if (isGenerated) {
    const updatedTokens = [...this.generatedTokens, tokenId];
    this.generatedTokens = updatedTokens;
  } else {
    const updatedTokens = [...this.acceptedTokens, tokenId];
    this.acceptedTokens = updatedTokens;
  }
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
