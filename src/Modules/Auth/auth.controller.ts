import { Request, Response } from 'express';
import catchAsync from '../Utility/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../Utility/ResponseType';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authServices.loginUser(email, password);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successfully',
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
};
