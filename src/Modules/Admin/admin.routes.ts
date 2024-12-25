import { Router } from 'express';
import { adminController } from './admin.controller';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';

const adminRoutes = Router();
adminRoutes.patch(
  '/users/:userId/block',
  authValidationRequest('admin'),
  adminController.blockUser,
);
adminRoutes.delete(
  '/blogs/:id',
  authValidationRequest('admin'),
  adminController.deleteBlog,
);

export default adminRoutes;
