import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  database: 'postgres',
  host: process.env.DATABASE_URL,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: 5432,
});

export default pool;
