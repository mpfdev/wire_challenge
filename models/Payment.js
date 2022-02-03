const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    type: { type: boolean, required: true },
    card: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', PaymentSchema);
