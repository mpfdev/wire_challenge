const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Client', ClientSchema);
