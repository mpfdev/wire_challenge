const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const paymentRoute = require('./routes/payment');
const buyerRouter = require('./routes/buyer');

dotenv.config();
app.use(express.json());
app.use('/api', paymentRoute);
app.use('/api', buyerRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server connected to port 3000`);
});
