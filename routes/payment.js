const router = require('express').Router();
const Buyer = require('../models/Buyer');
const Card = require('../models/Card');
const Client = require('../models/Client');
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

  //End Functions =========================
  //Look if there is a Buyer in the DB
  //If not, create one
  Buyer.find({ buyerCpf })
    .then((eachCPF) => {
      if (eachCPF) {
        return;
      }

      Buyer.create({
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerCpf: buyerCpf,
      });

      console.log(Buyer);
    })
    .catch((err) => {
      console.error(err);
    });

  //payment_method is boleto
  if (payment_method.toLowerCase() === 'boleto') {
    try {
      const newBoleto = generateBoleto();
      const cursor = Payment.find({});
      const numberOfPayments = await cursor.toArray;

      Payment.create({
        amount: amount,
        payment_method: payment_method.toLowerCase(),
        boleto: newBoleto,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerCpf: buyerCpf,
        clientID: numberOfPayments.length,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
