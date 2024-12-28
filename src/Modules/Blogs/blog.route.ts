import { Router } from 'express';
import { blogController } from './blog.controller';
import checkValidationRequest from '../GlobalMiddleware/CheckValidationRequest/check.validation.request';
import { blogValidation } from './blog.validation';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';
import { USER_ROLE } from '../Users/user.constant';

const blogRoute = Router();

blogRoute.post(
  '/blogs',
  checkValidationRequest(blogValidation.blogValidationSchema),
  authValidationRequest(USER_ROLE.user),
  blogController.createBlog,
);
blogRoute.get(
  '/blogs',

  blogController.getAllBlogs,
);
blogRoute.get(
  '/blogs/:id',

  blogController.getSingleBlogs,
);
blogRoute.patch(
  '/blogs/:id',
  checkValidationRequest(blogValidation.updateBlogValidationSchema),
  authValidationRequest(USER_ROLE.user),
  blogController.updateBlogs,
);
blogRoute.delete(
  '/blogs/:id',
  authValidationRequest(USER_ROLE.user),
  blogController.deleteBlogs,
);
export default blogRoute;
