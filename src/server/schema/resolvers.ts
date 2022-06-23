import { AuthenticationError, UserInputError } from 'apollo-server-express';
import User from '../models/User';
import Checklist, { ChecklistItem } from '../models/Checklist';
import { signToken } from '../util/auth';
import { Types } from 'mongoose';

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id).populate('checklists');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    checklists: async (parent: any, args: any, context: any) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          'checklists'
        );
        return user?.checklists;
      }
      throw new AuthenticationError('Must be logged in to see your checklists');
    },
  },
  Mutation: {
    addUser: async (
      parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (
      parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email!');
      }
      const token = signToken(user);
      return { token, user };
    },
    addChecklist: async (parent: any, args: { name: string }, context: any) => {
      if (context.user) {
        const newChecklist = await Checklist.create({
          name: args.name,
          user: context.user._id,
        });
        const currUser = await User.findById(context.user._id);
        if (!currUser) {
          throw new AuthenticationError('Invalid token found!');
        }
        currUser.checklists.push(newChecklist._id);
        await currUser.save();
        return newChecklist;
      }
      throw new AuthenticationError('Must be logged in to add a checklist');
    },
    addChecklistItem: async (
      parent: any,
      args: { id: string; itemName: string; due?: string },
      context: any
    ) => {
      if (context.user) {
        const currChecklist = await Checklist.findById(args.id);
        if (!currChecklist) {
          throw new UserInputError('could not find checklist with that ID');
        }
        const newChecklistItem: ChecklistItem = {
          name: args.itemName,
          done: false,
          _id: new Types.ObjectId(),
        };

        if (args.due) {
          newChecklistItem.due = new Date(args.due);
        }
        currChecklist.items.push(newChecklistItem);
        return currChecklist.save();
      }
      throw new AuthenticationError('Must be logged in to modify a checklist');
    },
  },
};

export default resolvers;
