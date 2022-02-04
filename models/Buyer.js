const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Buyer', BuyerSchema);
