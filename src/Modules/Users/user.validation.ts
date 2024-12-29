import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password must be at most 16 characters long'),
    role: z.enum(['admin', 'user']),
  }),
});

export const userValidation = {
  userValidationSchema,
};
