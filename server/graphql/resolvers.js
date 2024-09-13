const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organ = require('../models/Organ');
const Animal = require('../models/Animal');
const Cart = require('../models/Cart');

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Ensure this key is set in your .env file

const resolvers = {
  Query: {
    // Fetch all organs
    organs: async () => {
      return await Organ.find();
    },
    
    // Fetch all animals
    animals: async () => {
      return await Animal.find();
    },
    
    // Fetch a single user by ID
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    
    // Fetch all carts for a user
    cart: async (_, { userId }) => {
      return await Cart.findOne({ userId });
    },
    
    // Fetch a single organ by ID
    organ: async (_, { id }) => {
      return await Organ.findById(id);
    },
    
    // Fetch a single animal by ID
    animal: async (_, { id }) => {
      return await Animal.findById(id);
    }
  },
  
  Mutation: {
    // User signup
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return newUser;
    },
    
    // User login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      return { token };
    },
    
    // Add an organ to the database
    addOrgan: async (_, { name, price, imageUrl, quantity }) => {
      const newOrgan = new Organ({ name, price, imageUrl, quantity });
      await newOrgan.save();
      return newOrgan;
    },
    
    // Update an organ
    updateOrgan: async (_, { id, name, price, imageUrl, quantity }) => {
      return await Organ.findByIdAndUpdate(id, { name, price, imageUrl, quantity }, { new: true });
    },
    
    // Delete an organ
    deleteOrgan: async (_, { id }) => {
      return await Organ.findByIdAndRemove(id);
    },
    
    // Add an animal to the database
    addAnimal: async (_, { name, price, imageUrl, quantity }) => {
      const newAnimal = new Animal({ name, price, imageUrl, quantity });
      await newAnimal.save();
      return newAnimal;
    },
    
    // Update an animal
    updateAnimal: async (_, { id, name, price, imageUrl, quantity }) => {
      return await Animal.findByIdAndUpdate(id, { name, price, imageUrl, quantity }, { new: true });
    },
    
    // Delete an animal
    deleteAnimal: async (_, { id }) => {
      return await Animal.findByIdAndRemove(id);
    },
    
    // Add an item to the cart
    addToCart: async (_, { userId, itemId, itemType, quantity }) => {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      cart.items.push({ itemId, itemType, quantity });
      await cart.save();
      return cart;
    },
    
    // Remove an item from the cart
    removeFromCart: async (_, { userId, itemId }) => {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.items = cart.items.filter(item => item.itemId !== itemId);
      await cart.save();
      return cart;
    },
    
    // Checkout and clear the cart
    checkout: async (_, { userId }) => {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error('Cart not found');
      }
      // Here you would process the payment and clear the cart
      await Cart.deleteOne({ userId });
      return cart;
    }
  }
};

module.exports = resolvers;
