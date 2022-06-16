import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`