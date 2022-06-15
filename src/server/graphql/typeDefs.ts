import { gql } from "apollo-server-express"

const typedefs = gql`
type User {
  _id: ID
  email: String
  password: String
}
`