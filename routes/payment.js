const router = require('express').Router();
const Buyer = require('../models/Buyer');
const Card = require('../models/Card');
const Client = require('../models/Client');
const Payment = require('../models/Payment');

router.get('/payment', (req, res) => {
  res.send("It's working!");
});

module.exports = router;
