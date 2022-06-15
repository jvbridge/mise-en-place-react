import { AuthenticationError } from 'apollo-server-express';
import User from 'models/User';
import { signToken } from 'util/auth';

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
  Mutation: {
    addUser: async (
      parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    }
    // TODO login
  }
};

export default resolvers;
