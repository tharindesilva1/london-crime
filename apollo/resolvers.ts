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
    findCrimeTypesInArea: async (_, args) => {
      const { xMin, xMax, yMin, yMax, type } = args;
      const startDate = new Date(args.startDate);
      const endDate = new Date(args.endDate);
      return await Crime.findCrimeTypesInArea(
        startDate,
        endDate,
        xMin,
        xMax,
        yMin,
        yMax,
        type
      );
    },
    getCrimes: async (_, args) => {
      try {
        const crimes = await Crime.getCrimes(args.ids);

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
