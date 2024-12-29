import { Request, Response } from 'express';
import catchAsync from '../Utility/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../Utility/ResponseType';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authServices.loginUser(email, password);
  const token = result.accessToken;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: { token },
  });
});

export const authController = {
  registerUser,
  loginUser,
};
