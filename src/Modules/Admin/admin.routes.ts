import { Router } from 'express';
import { adminController } from './admin.controller';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';
import { USER_ROLE } from '../Users/user.constant';

const adminRoutes = Router();
adminRoutes.patch(
  '/admin/users/:userId/block',
  authValidationRequest(USER_ROLE.admin),
  adminController.blockUser,
);
adminRoutes.delete(
  '/admin/blogs/:id',
  authValidationRequest(USER_ROLE.admin),
  adminController.deleteBlog,
);

export default adminRoutes;
