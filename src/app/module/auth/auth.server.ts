import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILoginData, ILoginResponse } from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';
import { generateUserId } from '../user/user.utils';
import { RedisClient } from '../../../shared/redis';

const registerUser = async (payload: IUser): Promise<IUser> => {
  const id = await generateUserId();
  payload.id = id;
  console.log(id);
  const newUser = await User.create(payload);
  if (newUser) {
    await RedisClient.publish('user.created', JSON.stringify(newUser));
  }
  return newUser;
};
const loginUser = async (payload: ILoginData): Promise<ILoginResponse> => {
  const isUserExist: any = await User.findOne({ email: payload.email });

  if (
    isUserExist.password &&
    !User.isPasswordMatched(payload.password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorect');
  }
  const { email,id:userId } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email,userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token: accessToken,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
