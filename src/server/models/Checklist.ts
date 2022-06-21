import { Schema, model, Document, Model, Types } from 'mongoose';

interface ChecklistItem {
  _id: Types.ObjectId;
  name: string;
  due?: Date;
  done: boolean;
}

interface ChecklistDocument extends Document {
  name: string;
  items: ChecklistItem[];
}

const checklistSchema = new Schema<ChecklistDocument>({
  name: {
    type: String,
    required: true,
  },
  items: [],
});

const Checklist: Model<ChecklistDocument> = model('Checklist', checklistSchema);

export default Checklist;
