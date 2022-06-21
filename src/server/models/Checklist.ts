import { Schema, model, Document, Model, Types } from 'mongoose';

interface ChecklistItem {
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
  },
  items: [],
});

const Checklist: Model<ChecklistDocument> = model('Checklist', checklistSchema);

export default Checklist;
