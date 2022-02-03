const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    cardHolderName: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cardExpirationDate: { type: Number, required: true },
    cardCVV: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', CardSchema);
