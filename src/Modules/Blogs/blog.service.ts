import { JwtPayload } from 'jsonwebtoken';
import AppError from '../GlobalMiddleware/ErrorsType/AppError';
import QueryBuilder from '../QueryBuilders/query.builder';
import { TBlog } from './blog.interface';
import Blog from './blog.model';
import User from '../Users/user.model';

const createBlog = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content', 'author.name'];

  const searchQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await searchQuery.modelQuery;
  return result;
};
const getSingleBlogs = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};
const updateBlogs = async (
  id: string,
  payload: Partial<TBlog>,
  user: JwtPayload,
) => {
  const isBlogExist = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError(404, 'Blog is not found');
  }
  const decodedUser = user?.jwtPayload;

  // console.log('decodedUser', user);
  const findAuthor = await User.findOne({ email: decodedUser?.email });
  const isAuthorAndUserMatch = isBlogExist?.author.equals(findAuthor?._id);
  // console.log({ isBlogExist }, { findAuthor });
  if (!isAuthorAndUserMatch) {
    throw new AppError(403, 'You can only update or delete your own blogs');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteBlog = async (id: string, user: JwtPayload) => {
  const isBlogExist = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError(404, 'Blog is not found');
  }
  const decodedUser = user?.jwtPayload;

  // console.log('decodedUser', user);
  const findAuthor = await User.findOne({ email: decodedUser?.email });
  const isAuthorAndUserMatch = isBlogExist?.author.equals(findAuthor?._id);
  // console.log({ isBlogExist }, { findAuthor });
  if (!isAuthorAndUserMatch) {
    throw new AppError(403, 'You can only update or delete your own blogs');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlogs,
  updateBlogs,
  deleteBlog,
};
