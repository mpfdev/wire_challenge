const router = require('express').Router();
const Payment = require('../models/Payment');

//@Get all the payments
//GET ROUTE
router.get('/payment', async (req, res) => {
  try {
    const allPayments = await Payment.find();
    res.send(allPayments);
    console.log(`All payments on DB ${allPayments}`);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.error(e);
  }
});

//@Create New payment
//POST ROUTE
router.post('/payment/create', async (req, res) => {
  //desestruct to make it more readable
  const {
    amount,
    payment_method,
    cardHolderName,
    cardNumber,
    cardExpirationDate,
    cardCVV,
    cardBrand,
    buyerName,
    buyerEmail,
    buyerCpf,
    clientID,
  } = req.body;

  //Functions =========================
  //Generate Boleto
  function generateBoleto() {
    let serialNumbers = [];
    for (let i = 0; i <= 47; i++) {
      serialNumbers.push(Math.floor(Math.random() * 9));
    }

    return serialNumbers.join('');
  }

  //Is it successful?
  function isSuccessful() {
    return Math.floor(Math.random() * 2) === 0 ? 'approved' : 'reproved';
  }

  //End Functions =========================

  //payment_method is boleto
  if (payment_method.toLowerCase() === 'boleto') {
    try {
      const novoBoleto = generateBoleto();

      Payment.create({
        amount: amount,
        payment_method: payment_method.toLowerCase(),
        boleto: novoBoleto,
        buyerName: buyerName,
        buyerCpf: buyerCpf,
        buyerEmail: buyerEmail,
        clientID: clientID,
      });

      res.status(200).json({
        boleto: `${novoBoleto} gerado`,
      });
    } catch (e) {
      console.error(e);
    }
  }

  //payment_method is card
  if (payment_method.toLowerCase() === 'card') {
    try {
      const verifyStatus = isSuccessful();

      Payment.create({
        amount: amount,
        payment_method: payment_method.toLowerCase(),
        cardHolderName: cardHolderName,
        cardBrand: cardBrand,
        cardNumber: cardNumber,
        cardExpirationDate: cardExpirationDate,
        cardCVV: cardCVV,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerCpf: buyerCpf,
        clientID: clientID,
        status: verifyStatus,
      });

      res.status(200).json({
        status: `${verifyStatus}`,
      });
    } catch (e) {
      console.error(e);
    }
  }
});

module.exports = router;
