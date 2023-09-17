import { Model } from 'mongoose';

export type IUser = {
  id: string;
  username: string;
  email: string;
  password: string;

};
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;