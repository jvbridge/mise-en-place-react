import { AuthenticationError, UserInputError } from 'apollo-server-express';
import User from '../models/User';
import Checklist, { ChecklistItem } from '../models/Checklist';
import { signToken } from '../util/auth';
import { Types } from 'mongoose';

/**
 * A getter used for getting a checklsit. This is repeated enough to merit a
 * small function
 */
const getChecklist = async (id: Types.ObjectId | string) => {
  const ret = await Checklist.findById(id);
  if (!ret) throw new UserInputError('Could not find a checklist with that ID');
  return ret;
};

/**
 * Helper function to avoid repeating code when marking values as done or not
 * done
 * @param checklistId the checklist to update
 * @param itemId the item on the checklist to update
 * @param markValue what the value updated should be
 * @returns
 */
const markChecklistItem = async (
  checklistId: string,
  itemId: string,
  markValue: boolean
) => {
  // get the current item
  const currChecklist = await getChecklist(checklistId);
  const currItem = currChecklist.items.find((item) => {
    return item._id.toString() == itemId;
  });
  // no item? throw error
  if (!currItem)
    throw new UserInputError('Could not find a checklist item with that ID');

  // mark the item as done
  currItem.done = markValue;
  // update the array of items with the new item
  currChecklist.items = currChecklist.items.map((item) => {
    if (item._id == currItem._id) {
      return currItem;
    }
    return item;
  });
  // update the item and save it
  return currChecklist.save();
};

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
      const user = await User.findOne({ email }).populate('checklists');

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const token = signToken(user);
      return { token, user };
    },

    addChecklist: async (parent: any, args: { name: string }, context: any) => {
      if (context.user) {
        await Checklist.create({
          name: args.name,
          user: context.user._id,
        });
        const currUser = await User.findById(context.user._id).populate(
          'checklists'
        );
        if (!currUser)
          throw new UserInputError(
            'Current session could not find a user with current id'
          );
        return currUser.checklists;
      }
      throw new AuthenticationError(
        'You must be logged in to create checklists'
      );
    },
    removeChecklist: async (
      parent: any,
      args: { id: string | Types.ObjectId },
      context: any
    ) => {
      // ensure login
      if (context.user) {
        // delete this checklist
        await Checklist.findByIdAndDelete(args.id);

        // get the current user from the database after they lost the checklist
        const currUser = await User.findById(context.user._id).populate(
          'checklists'
        );
        if (!currUser)
          throw new UserInputError(
            'Current session could not find a user with current id'
          );
        return currUser.checklists;
      }
      throw new AuthenticationError('Must be logged in to remove a checklist');
    },
    addChecklistItem: async (
      parent: any,
      args: { id: string; itemName: string; due?: string },
      context: any
    ) => {
      if (context.user) {
        const currChecklist = await getChecklist(args.id);
        const newChecklistItem: ChecklistItem = {
          name: args.itemName,
          done: false,
          _id: new Types.ObjectId(),
        };

        if (args.due) {
          newChecklistItem.due = new Date(args.due);
        }
        currChecklist.items.push(newChecklistItem);
        await currChecklist.save();
        return currChecklist.items;
      }
      throw new AuthenticationError('Must be logged in to modify a checklist');
    },
    markItemDone: async (
      parent: any,
      args: { checklistId: string; itemId: string },
      context: any
    ) => {
      const { checklistId, itemId } = args;
      // hand off the work to helper function
      return markChecklistItem(checklistId, itemId, true);
    },
    markItemNotDone: async (
      parent: any,
      args: { checklistId: string; itemId: string },
      context: any
    ) => {
      const { checklistId, itemId } = args;
      // hand off the work to helper function
      return markChecklistItem(checklistId, itemId, false);
    },
  },
};

export default resolvers;
