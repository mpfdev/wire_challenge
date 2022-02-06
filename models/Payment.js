const mongoose = require('mongoose');

// enum: https://docs.mongodb.com/manual/core/schema-validation/

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    payment_method: {
      type: String,
      enum: ['card', 'boleto'],
      required: true,
      description: 'payment method required to process the payment',
    },
    boleto: { type: String },
    cardHolderName: { type: String },
    cardBrand: { type: String },
    cardNumber: { type: String },
    cardExpirationDate: { type: String },
    cardCVV: { type: String },
    buyerName: { type: String },
    buyerEmail: { type: String },
    buyerCpf: { type: String },
    clientID: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', PaymentSchema);
