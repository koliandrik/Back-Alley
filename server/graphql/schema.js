// server/schema.js
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const UserType = require('./models/User');
const OrganType = require('./models/Organ');
const AnimalType = require('./models/Animal');
const User = require('./models/User');
const Organ = require('./models/Organ');
const Animal = require('./models/Animal');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      }
    },
    organs: {
      type: new GraphQLList(OrganType),
      resolve(parent, args) {
        return Organ.find();
      }
    },
    animals: {
      type: new GraphQLList(AnimalType),
      resolve(parent, args) {
        return Animal.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        const user = new User({
          username: args.username,
          password: args.password
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
