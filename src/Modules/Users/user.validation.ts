import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
});

const userValidationSchema = z.object({
  body: z.object({
    name: nameValidationSchema,
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password must be at most 16 characters long'),
    role: z.enum(['admin', 'user']),
    profileImage: z.string().optional(),
  }),
});

export const userValidation = {
  userValidationSchema,
};
