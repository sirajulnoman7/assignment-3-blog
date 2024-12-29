import { NextFunction, Request, Response } from 'express';

import catchAsync from '../../Utility/catchAsync';
import AppError from '../ErrorsType/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import User from '../../Users/user.model';

const authValidationRequest = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const authorizationToken = req.headers.authorization;
    // console.log({ authorizationToken });

    //  removed the Bearer word
    const token = authorizationToken?.split('Bearer ')[1];

    if (!token) {
      throw new AppError(401, 'You are not authorized');
    }

    // invalid token - synchronous

    const decoded = jwt.verify(
      token,
      config.jwt_token_secret as string,
    ) as JwtPayload;
    const role = decoded.jwtPayload.role;
    const email = decoded.jwtPayload.email;
    const user = await User.findOne({ email });
    if (user?.isBlocked) {
      throw new AppError(400, 'user is already blocked');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authValidationRequest;
