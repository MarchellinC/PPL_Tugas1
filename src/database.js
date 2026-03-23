const Database = require("better-sqlite3");

const db = new Database("database.db");

// buat tabel
db.prepare(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    type TEXT,
    transmission TEXT,
    plate TEXT,
    price INTEGER,
    status TEXT
  )
`).run();

module.exports = db;