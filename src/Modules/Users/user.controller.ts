import { Request, Response } from 'express';
import catchAsync from '../Utility/catchAsync';
import { userServices } from './user.services';
import sendResponse from '../Utility/ResponseType';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsers();
  console.log('test parpose', req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'get all user  successfully',
    data: result,
  });
});
const getSingleUsers = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.getSingleUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'get single user  successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.updateUser(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user updated  successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user deleted  successfully',
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
};
