const typeDefs = `#graphql

  type Star {
    index: String
    type: String
    price: Float
    name: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    star: Star
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getStar: Star
    user: User
    order(_id: ID!): Order
    checkout(index: String!, type: String!, price: Float!, name: String!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(name: String!, index: String!, type: String!, price: Number!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
