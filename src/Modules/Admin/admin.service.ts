import Blog from '../Blogs/blog.model';
import AppError from '../GlobalMiddleware/ErrorsType/AppError';
import User from '../Users/user.model';

const blockedUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  blockedUser,
  deleteBlog,
};
