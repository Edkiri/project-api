import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const Config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration',
  synchronize: false,
  logging: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : null,
};

export const AppDataSource: DataSource = new DataSource(Config);
