import { registerAs } from '@nestjs/config';
import { AppConfig } from 'src/types/config';

const appConfig = registerAs<AppConfig>('app', () => ({
  PORT: Number(process.env.PORT) || 4000,
}));

export default appConfig;
