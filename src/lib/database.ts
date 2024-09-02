import Database from 'better-sqlite3';

const db = new Database('./db.sqlite', { verbose: console.log });

export async function getDb() {
  return db;
}

export async function setupDatabase() {
  const db = await getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS WaterConsumption (
      consumption_id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumption_date DATE NOT NULL,
      amount REAL NOT NULL,  -- Amount in liters or other units
      UNIQUE (consumption_date)
    );
  `);
}