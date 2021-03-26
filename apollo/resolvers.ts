import { IResolvers } from "apollo-server-micro";
import Crime from "../models/crime";

export const resolvers: IResolvers = {
  Query: {
    findCrimes: async (_, args) => {
      try {
        const startDate = new Date(args.startDate);
        const endDate = new Date(args.endDate);
        const crimes = await Crime.findCrimes(startDate, endDate, args.type);

        return crimes.map((crime) => ({
          id: crime.id,
          location: crime.location.coordinates,
          type: crime.type,
        }));
      } catch (error) {
        throw error;
      }
    },
    getCrimes: async (_, _args) => {
      try {
        const crimes = await Crime.getCrimes(_args.ids);

        return crimes.map(({ type, location }) => ({
          location,
          type,
        }));
      } catch (error) {
        throw error;
      }
    },
  },
};
