import { Schema, model, Document, Model, Types } from 'mongoose';
import bcrypt = require('bcrypt');

// define the interface
export interface UserDocument extends Document {
  email: string;
  password: string;
  checklists: Types.ObjectId[];
  isCorrectPassword: Function;
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
});

// before making a new user or updating a user's password, ecrypt it
userSchema.pre('save', async function (next: Function) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
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
