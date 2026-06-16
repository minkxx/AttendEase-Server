import 'dotenv/config';
import { Pool } from 'pg';

export const sharedPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
