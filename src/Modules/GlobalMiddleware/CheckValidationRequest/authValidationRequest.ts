import { NextFunction, Request, Response } from 'express';

import catchAsync from '../../Utility/catchAsync';
import AppError from '../ErrorsType/AppError';

const authValidationRequest = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized');
    }
    console.log(req.headers.authorization);

    next();
  });
};

export default authValidationRequest;
