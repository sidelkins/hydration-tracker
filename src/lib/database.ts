import Database from 'better-sqlite3';
import * as constants from '$lib/constants';

const db = new Database(constants.db_file, { verbose: constants.isDev ? console.log : undefined });

export async function getDb() {
  return db;
}

export async function setupDatabase() {
  const db = await getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS consumption (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATE NOT NULL,
      amount REAL NOT NULL,
      UNIQUE (timestamp)
    );
  `);
}