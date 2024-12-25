import AppError from '../GlobalMiddleware/ErrorsType/AppError';
import TUser from './user.interface';
import User from './user.model';

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id);
  if (user?.isBlocked === true) {
    throw new AppError(400, 'You can not update this user, he is blocked');
  }
  // console.log(user);
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
