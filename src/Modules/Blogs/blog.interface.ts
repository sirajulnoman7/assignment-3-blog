import { Types } from 'mongoose';

export type TAuthor = {
  name: string;
  email: string;
  contactNo: string;
  authorImage?: string;
};

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished?: boolean;
};
