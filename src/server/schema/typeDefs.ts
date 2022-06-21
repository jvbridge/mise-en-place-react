import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type ChecklistItem {
    name: String!
    due: String
    done: Boolean!
  }

  type Checklist {
    name: String!
    items: [ChecklistItem]
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
