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

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
    }
  }
}
`