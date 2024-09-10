const mongoose = require('mongoose');

const organSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

const Organ = mongoose.model('Organ', organSchema);

module.exports = Organ;
