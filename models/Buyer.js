const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true, unique: true },
  buyerCpf: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Buyer', BuyerSchema);
