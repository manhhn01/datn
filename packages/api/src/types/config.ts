export interface AppConfig {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT: number;
}

export interface DatabaseConfig {
  DATABASE_URL: string;
}
