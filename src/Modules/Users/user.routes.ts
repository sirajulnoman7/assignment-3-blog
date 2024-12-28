import { Router } from 'express';
import { userController } from './user.controller';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';
import { USER_ROLE } from './user.constant';

const userRoute = Router();

userRoute.get(
  '/users',
  authValidationRequest(USER_ROLE.admin),
  userController.getAllUsers,
);
userRoute.get(
  '/users/:id',
  // authValidationRequest('admin'),
  userController.getSingleUsers,
);
userRoute.patch(
  '/users/:id',
  // authValidationRequest('user'),
  userController.updateUser,
);
userRoute.delete(
  '/users/:id',
  // authValidationRequest('admin'),
  userController.deleteUser,
);

export default userRoute;
