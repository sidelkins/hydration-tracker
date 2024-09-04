import Database from 'better-sqlite3';
import * as constants from '$lib/constants';
import * as serverConstants from '$lib/constants.server';

const db = new Database(serverConstants.dbFile, { verbose: serverConstants.isDev ? console.log : undefined });

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