import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  database: 'helpdesk_admin',
  host: process.env.DATABASE_URL,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: 5432,
});

export default pool;
