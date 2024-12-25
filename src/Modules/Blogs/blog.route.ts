import { Router } from 'express';
import { blogController } from './blog.controller';
import checkValidationRequest from '../GlobalMiddleware/CheckValidationRequest/check.validation.request';
import { blogValidation } from './blog.validation';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';

const blogRoute = Router();

blogRoute.post(
  '/blogs',
  checkValidationRequest(blogValidation.blogValidationSchema),
  authValidationRequest('admin', 'user'),
  blogController.createBlog,
);
blogRoute.get(
  '/blogs',
  authValidationRequest('admin', 'user'),
  blogController.getAllBlogs,
);
blogRoute.get(
  '/blogs/:id',
  authValidationRequest('admin', 'user'),
  blogController.getSingleBlogs,
);
blogRoute.patch(
  '/blogs/:id',
  checkValidationRequest(blogValidation.updateBlogValidationSchema),
  authValidationRequest('admin', 'user'),
  blogController.updateBlogs,
);
blogRoute.delete(
  '/blogs/:id',
  authValidationRequest('admin', 'user'),
  blogController.deleteBlogs,
);
export default blogRoute;
