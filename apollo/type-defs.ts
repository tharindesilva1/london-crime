import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Crime {
    id: String!
    location: [Float!]
    type: String
  }

  type TypeCount {
    type: String!
    count: Int!
  }

  type Query {
    findCrimes(startDate: String!, endDate: String!, type: String): [Crime]!
    getCrimes(ids: [String!]!): [Crime!]!
    findCrimeTypesInArea(
      startDate: String!
      endDate: String!
      xMin: Float!
      xMax: Float!
      yMin: Float!
      yMax: Float!
      type: String
    ): [TypeCount]!
  }
`;
