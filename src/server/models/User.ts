import { Schema, model, Document, Model, Types, Query } from 'mongoose';
import Checklist from './Checklist';
import bcrypt = require('bcrypt');

// define the interface
export interface UserDocument extends Document {
  email: string;
  password: string;
  checklists: Types.ObjectId[];
  isCorrectPassword: Function;
  todo: Types.ObjectId;
}

// define the schema
const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  checklists: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Checklist' }],
  },
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'Checklist',
  },
});

userSchema.pre('save', async function (next: Function) {
  // before making a new user or updating a user's password, ecrypt it
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // if we are creating a new user they by default get a todo list
  if (this.isNew) {
    const todoList = await Checklist.create({
      user: this._id,
      name: 'To Dos',
      todoList: true,
    });
    this.todo = todoList._id;
  }

  next();
});

// comparison method for getting the password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// make the schema into a model
const User: Model<UserDocument> = model<UserDocument>('User', userSchema);

export default User;
