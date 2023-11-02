import { registerAs } from '@nestjs/config';
import { AppConfig } from 'src/types/config';

export default registerAs<AppConfig>('app', () => ({
  PORT: Number(process.env.PORT) || 4000,
}));
