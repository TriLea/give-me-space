const typeDefs = `#graphql
  
  type Order {
    _id: ID
    purchaseDate: String
    stars: [Stars]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    stars: [Stars]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
