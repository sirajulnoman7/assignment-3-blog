export type TAuthor = {
  name: string;
  email: string;
  contactNo: string;
  authorImage?: string;
};

export type TBlog = {
  title: string;
  content: string;
  author: TAuthor;
  isPublished?: boolean;
};
