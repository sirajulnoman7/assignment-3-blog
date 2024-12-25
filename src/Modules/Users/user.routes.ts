import { Router } from 'express';
import { userController } from './user.controller';
import authValidationRequest from '../GlobalMiddleware/CheckValidationRequest/authValidationRequest';

const userRoute = Router();

userRoute.get('/users', authValidationRequest(), userController.getAllUsers);
userRoute.get('/users/:id', userController.getSingleUsers);
userRoute.patch('/users/:id', userController.updateUser);
userRoute.delete('/users/:id', userController.deleteUser);

export default userRoute;
