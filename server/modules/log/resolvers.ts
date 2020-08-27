import { Types } from "mongoose";
import { UserRole } from "../../models/User";

const resolvers = {
  Query: {
    logHistoryByUserId: async (
      _: any,
      args: any,
      { models: { Log }, user: currentUser }: any
    ) => {
      /**
       * We are using MongoDB here, but the point of this demonstration
       * is that Logs would be stored in another database.
       */
      const { userId } = args;

      if (currentUser.role != UserRole.ADMIN) {
        return null;
      }

      const res = await Log.aggregate([
        {
          $match: { userId: Types.ObjectId(userId) },
        },
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
          },
        },
      ]);

      return res[0];
    },
  },
  Mutation: {
    addLog: (_: any, __: any, { user }: any) => {},
  },
};

export default resolvers;
