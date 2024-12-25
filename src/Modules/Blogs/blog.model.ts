import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: {
    name: { type: String },
    email: { type: String },
    contactNo: { type: String, unique: true },
    authorImage: { type: String },
  },
  isPublished: { type: Boolean, required: true },
});

const Blog = model<TBlog>('Blog', blogSchema);

export default Blog;
