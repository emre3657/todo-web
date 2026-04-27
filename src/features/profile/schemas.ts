import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(5, 'Username must be at least 5 characters long')
      .max(30, 'Username must be at most 30 characters long')
      .optional(),
    email: z
      .email('Please enter a valid email address')
      .optional(),
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long')
      .max(20, 'New password must be at most 20 characters long')
      .regex(/[A-Za-z]/, 'New password must contain at least one letter')
      .regex(/\d/, 'New password must contain at least one number'),
    repassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repassword, {
    message: 'Passwords do not match',
    path: ['repassword'],
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
