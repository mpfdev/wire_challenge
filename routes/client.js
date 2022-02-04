const router = require('express').Router();

router.get('/customers', (req, res) => {
  res.send(`Connected to Customers`);
});

router.post('/customers', (req, res) => {
  const customer = req.body.customer;
  res.send(`Owner: ${customer}`);
});

module.exports = router;
