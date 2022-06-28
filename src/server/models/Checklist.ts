import { Schema, model, Document, Model, Types } from 'mongoose';
import User from './User';

export interface ChecklistItem {
  _id: Types.ObjectId;
  name: string;
  due?: Date;
  done: boolean;
}

interface ChecklistDocument extends Document<Types.ObjectId> {
  name: string;
  items: ChecklistItem[];
  user: Types.ObjectId;
}

const checklistSchema = new Schema<ChecklistDocument>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [],
});

// when a checklist is new it must
checklistSchema.pre('save', async function (next: Function) {
  if (this.isNew) {
    // find parent
    const parentUser = await User.findById(this.user);
    if (!parentUser) throw new Error('Could not find parent user');
    // add this to parent's checklists
    parentUser.checklists.push(this._id);
    await parentUser.save();
  }
  next();
});

// before removing a checklist make sure that it removes itself from the user
checklistSchema.pre('remove', async function (next: Function) {
  // get the reference to the user
  const parentUser = await User.findById(this.user);

  // the checklist must have a parent user
  if (!parentUser) throw new Error('could not find parent user');

  // remove the current checklist from the parent's checklists
  parentUser.checklists = parentUser.checklists.filter((list) => {
    list._id != this._id;
  });
  await parentUser.save();
  next();
});

const Checklist: Model<ChecklistDocument> = model('Checklist', checklistSchema);

export default Checklist;
