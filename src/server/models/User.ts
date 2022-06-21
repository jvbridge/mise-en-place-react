import { Schema, model, Document, Model } from 'mongoose';
import bcrypt = require('bcrypt');

// define the interface
interface UserDocument extends Document {
  email: string;
  password: string;
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
  return bcrypt.compare(password, this.password);
};

// make the schema into a model
const User: Model<UserDocument> = model('User', userSchema);

export default User;
