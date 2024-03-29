import { AuthenticationError, UserInputError } from 'apollo-server-express';
import User from '../models/User';
import Checklist, { ChecklistItem } from '../models/Checklist';
import { signToken } from '../util/auth';
import { Types } from 'mongoose';

/**
 * A getter used for getting a checklist. This will find the checklist,
 * validate that the id given was the correct one, and then authenticate that
 * the user getting it has authorization
 */
const getChecklist = async (id: Types.ObjectId | string, userId: string) => {
  const ret = await Checklist.findById(id);
  if (!ret) throw new UserInputError('Could not find a checklist with that ID');

  if (ret.user.toString() != userId) {
    throw new AuthenticationError(
      'User does not have authorization to modify checklist'
    );
  }

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
  markValue: boolean,
  userId: string
) => {
  // get the current item
  const currChecklist = await getChecklist(checklistId, userId);

  // flag to ensure we found an item
  let updateFlag = false;

  // iterate over the array overwriting one item
  currChecklist.items = currChecklist.items.map((item) => {
    if (item._id.toString() == itemId) {
      item.done = markValue;
      updateFlag = true;
      return item;
    }
    return item;
  });

  if (!updateFlag)
    throw new UserInputError('Could not find a checklist item with that ID');

  // letting the db know we intend to update this
  currChecklist.markModified('items');
  // update the item and save it
  await currChecklist.save();
  return currChecklist.items;
};

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id)
          .populate('checklists')
          .populate('todo');
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
      const user = await User.findOne({ email })
        .populate('checklists')
        .populate('todo');

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
      args: { id: string },
      context: any
    ) => {
      // ensure login
      if (context.user) {
        // get the checkelist to delete
        const currChecklist = await getChecklist(args.id, context.user._id);
        // deleting checklist
        await currChecklist.delete();

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
        const currChecklist = await getChecklist(args.id, context.user._id);

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
    removeChecklistItem: async (
      parent: any,
      args: { checklistId: string; itemId: string },
      context: any
    ) => {
      if (context.user) {
        const currChecklist = await getChecklist(
          args.checklistId,
          context.user._id
        );

        currChecklist.items = currChecklist.items.filter(
          (item) => item._id.toString() != args.itemId
        );
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
      return await markChecklistItem(
        checklistId,
        itemId,
        true,
        context.user._id
      );
    },
    markItemNotDone: async (
      parent: any,
      args: { checklistId: string; itemId: string },
      context: any
    ) => {
      const { checklistId, itemId } = args;
      // hand off the work to helper function
      return await markChecklistItem(
        checklistId,
        itemId,
        false,
        context.user._id
      );
    },
    markAllNotDone: async (
      parent: any,
      args: { checklistId: string },
      context: any
    ) => {
      const currChecklist = await getChecklist(
        args.checklistId,
        context.user._id
      );
      currChecklist.items = currChecklist.items.map((item) => {
        item.done = false;
        return item;
      });

      currChecklist.markModified('items');
      await currChecklist.save();
      return currChecklist.items;
    },
  },
};

export default resolvers;
