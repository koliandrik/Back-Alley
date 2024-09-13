const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: String,
  price: String,
  quantity: String,
});

const Organ = mongoose.model('Animal', organSchema);

module.exports = Organ;