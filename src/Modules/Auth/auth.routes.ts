import { Router } from 'express';
import { authController } from './auth.controller';
import checkValidationRequest from '../GlobalMiddleware/CheckValidationRequest/check.validation.request';
import { userValidation } from '../Users/user.validation';

const authRoute = Router();

authRoute.post(
  '/register',
  checkValidationRequest(userValidation.userValidationSchema),
  authController.registerUser,
);
authRoute.post(
  '/login',

  authController.loginUser,
);

export default authRoute;
