import config from '../../config';
import AppError from '../GlobalMiddleware/ErrorsType/AppError';
import TUser from '../Users/user.interface';
import User from '../Users/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  const hashPassword = await bcrypt.compare(password, user?.password as string);
  // console.log(hashPassword);

  if (!user) {
    throw new AppError(400, 'Email not found');
  } else if (!hashPassword) {
    throw new AppError(400, 'Password is incorrect');
  } else if (user.isBlocked === true) {
    throw new AppError(400, 'You are blocked');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  //   access token

  const accessToken = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_token_secret as string,
    { expiresIn: '1d' },
  );
  return accessToken;
};

export const authServices = {
  registerUser,
  loginUser,
};
