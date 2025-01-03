import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    isPublished: z.boolean({
      required_error: 'Is published is required',
    }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z
      .object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        authorImage: z.string().optional(),
      })
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const blogValidation = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
