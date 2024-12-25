import { model, Schema } from 'mongoose';
import TUser, { TName } from './user.interface';
import AppError from '../GlobalMiddleware/ErrorsType/AppError';
import bcrypt from 'bcrypt';
import config from '../../config';

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const userSchema = new Schema<TUser>(
  {
    name: { type: nameSchema },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    profileImage: { type: String },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const isUserAlreadyExists = await User.findOne({ email: this.email });
  if (isUserAlreadyExists) {
    throw new AppError(400, 'User already exists');
  }
  next();
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds));
  next();
});

userSchema.post('save', async function (doc, next) {
  try {
    doc.password = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
  next();
});

const User = model<TUser>('User', userSchema);
export default User;
