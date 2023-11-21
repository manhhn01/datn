import { registerAs } from '@nestjs/config';
import { AppConfig } from 'src/types/config';

const appConfig = registerAs<AppConfig>('app', () => ({
  PORT: Number(process.env.PORT) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || 10,
}));

export default appConfig;
