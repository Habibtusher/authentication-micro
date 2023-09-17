import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
  
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null>  {
  return await User.findOne(
    { email }
  );
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
const User = model<IUser, UserModel>('User', userSchema);
export default User;
