import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Query {
    me {
      email
    }
  }
`;

export const GET_CHECKLISTS = gql`
  query Query {
    checklists {
      name
      items {
        name
        _id
      }
      _id
    }
  }
`;
