import { Request, Response } from 'express';
import { blogServices } from './blog.service';
import catchAsync from '../Utility/catchAsync';
import sendResponse from '../Utility/ResponseType';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.createBlog(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'find all blogs successfully',
    data: result,
  });
});
const getSingleBlogs = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlogs(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'find single blog successfully',
    data: result,
  });
});
const updateBlogs = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedUser = req.user as JwtPayload;
  const result = await blogServices.updateBlogs(id, req.body, decodedUser);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'blog updated successfully',
    data: result,
  });
});
const deleteBlogs = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlog(id, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'blog deleted successfully',
    data: result,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getSingleBlogs,
  updateBlogs,
  deleteBlogs,
};
