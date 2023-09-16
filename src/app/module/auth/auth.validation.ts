import { z } from 'zod';

const registration = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
  }),
});
const login = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const AuthValidation = { registration, login };
