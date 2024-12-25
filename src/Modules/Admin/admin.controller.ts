import { Request, Response } from 'express';
import catchAsync from '../Utility/catchAsync';
import { adminServices } from './admin.service';
import sendResponse from '../Utility/ResponseType';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await adminServices.blockedUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user blocked  successfully',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.deleteBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user deleted  successfully',
    data: result,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
