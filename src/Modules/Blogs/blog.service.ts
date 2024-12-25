import QueryBuilder from '../QueryBuilders/query.builder';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: TBlog) => {
  const result = await Blog.create(payload);
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
const updateBlogs = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteBlog = async (id: string) => {
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
