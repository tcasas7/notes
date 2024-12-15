/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Note } from './notes/note.entity';
import { Tag } from './notes/tag.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'tomas3782',
  database: process.env.DB_NAME || 'notes_app',
  schema: 'public',
  synchronize: false, 
  logging: true,
  entities: [Note, Tag], 
  migrations: ['src/migrations/**/*{.ts,.js}'], 
  migrationsRun: false,
  subscribers: [],
});
