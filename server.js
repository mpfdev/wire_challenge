const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const paymentRoute = require('./routes/payment');

dotenv.config();
app.use(express.json());
app.use('/api', paymentRoute);

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
