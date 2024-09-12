const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  quantity: Number,
});

module.exports = mongoose.model('Product', ProductSchema);
