const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: Boolean, required: true },
  card: { type: String },
});

module.exports = mongoose.model('Payment', PaymentSchema);
