const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Mongoose model for User
const Product = require('./models/Product'); // Mongoose model for Products

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/exotic-emporium', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }
  
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
    image: String!
    quantity: Int!
  }

  type Query {
    products(category: String!): [Product]
    me: User
  }

  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;

const resolvers = {
  Query: {
    products: async (_, { category }) => {
      return await Product.find({ category });
    },
    me: async (_, __, { user }) => {
      return await User.findById(user.id);
    },
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
      }
      return jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
    },
  },
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  const token = req.headers.authorization || '';
  const user = token ? jwt.verify(token, 'SECRET_KEY') : null;
  return { user };
}});

server.applyMiddleware({ app });

// Express setup
app.use(express.json());
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

const stripe = require('stripe')('your-secret-key-here'); // Use your Stripe secret key

app.post('/api/checkout', async (req, res) => {
  const { paymentMethodId, shippingAddress } = req.body;

  try {
    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Example amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Process shipping information here

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
