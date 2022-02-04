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
    console.log(allPayments);
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

  //Verify in the collection if we have the buyerCPF registred in the database
  //otherwise create a new buyer
  Buyer.find({ cpf })
    .then((eachBuyerCpf) => {
      if (eachBuyerCpf) {
        return;
      }

      const newBuyer = new Buyer({
        name: buyerName,
        email: buyerEmail,
        cpf: buyerCpf,
      });

      newBuyer.save();
    })
    .catch((err) => {
      console.error(err);
    });

  //Payment_method ===> BOLETO
  //Generate boleto numbers
  if (payment_method.toLowerCase() === 'boleto') {
    const newBoleto = generateBoleto();

    Payment.create({
      amount: amount,
      payment_method: payment_method.toLowerCase(),
      boleto: newBoleto,
      buyerName: buyerName,
      buyerEmail: buyerEmail,
      buyerCpf: buyerCpf,
      clientID: clientID,
    });
  }
});

module.exports = router;
