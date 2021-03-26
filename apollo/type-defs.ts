import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Crime {
    id: String!
    location: [Float!]
    type: String
  }

  type Query {
    findCrimes(startDate: String!, endDate: String!, type: String): [Crime]!
    getCrimes(ids: [String!]!): [Crime!]!
  }
`;
