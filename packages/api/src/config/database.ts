import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from 'src/types/config';

export default registerAs<DatabaseConfig>('database', () => ({
  DATABASE_URL: process.env.DATABASE_URL,
}));
