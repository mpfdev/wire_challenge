const router = require('express').Router();
const Buyer = require('../models/Buyer');

//@get all buyers from the buyer collection
router.get('/buyer', async (req, res) => {
  try {
    const allBuyers = await Buyer.find({});
    res.send(allBuyers);
  } catch (e) {
    res.send(500).json({
      error: e.messaage,
    });
    console.error(e);
  }
});

//@post create new buyer document in the buyer collection
router.post('/buyer/create', async (req, res) => {
  const { buyerName, buyerCpf, buyerEmail } = req.body;

  Buyer.findOne({ buyerCpf }).then((cpf) => {
    if (cpf) {
      res.status(200).json({
        message: `${cpf} found`,
        name: `${buyerName} registered`,
      });
      return;
    } else {
      try {
        Buyer.create({
          buyerName: buyerName,
          buyerEmail: buyerEmail,
          buyerCpf: buyerCpf,
        });
        res.status(200).json({
          message: `${buyerCpf} created`,
        });
      } catch (e) {
        res.status(500).json({
          error: e.messaage,
        });
        console.error(e);
      }
    }
  });
});

module.exports = router;
