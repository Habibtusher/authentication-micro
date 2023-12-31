import dotenv from 'dotenv';
import path from 'path';
import { preprocess } from 'zod';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  default_user_password: process.env.DEFAULT_USER_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXIRES_IN,
  },
  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN
  },
};
