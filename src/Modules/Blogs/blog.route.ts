import { Router } from 'express';
import { blogController } from './blog.controller';
import checkValidationRequest from '../GlobalMiddleware/CheckValidationRequest/check.validation.request';
import { blogValidation } from './blog.validation';

const blogRoute = Router();

blogRoute.post(
  '/blogs',
  checkValidationRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);
blogRoute.get('/blogs', blogController.getAllBlogs);
blogRoute.get('/blogs/:id', blogController.getSingleBlogs);
blogRoute.patch(
  '/blogs/:id',
  checkValidationRequest(blogValidation.updateBlogValidationSchema),
  blogController.updateBlogs,
);
blogRoute.delete('/blogs/:id', blogController.deleteBlogs);
export default blogRoute;
