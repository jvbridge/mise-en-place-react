import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    email: String
    password: String
    checklists: [Checklist]
  }

  type Auth {
    token: ID!
    user: User
  }

  type ChecklistItem {
    _id: ID!
    name: String!
    due: String
    done: Boolean!
  }

  type Checklist {
    _id: ID!
    name: String!
    items: [ChecklistItem]
  }

  type Query {
    me: User
    checklists: [Checklist]
    checklist(id: ID!): Checklist
  }

  type Mutation {
    addChecklist(name: String!): Checklist
    addChecklistItem(id: ID!, itemName: String!): Checklist
    markItemDone(checklistId: ID!, itemId: ID!): ChecklistItem
    markItemNotDone(checklistId: ID!, itemId: ID!): ChecklistItem
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
