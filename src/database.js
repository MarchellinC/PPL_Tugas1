const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT,
      type TEXT,
      transmission TEXT,
      plate TEXT,
      price INTEGER,
      status TEXT
    )
  `);
});

module.exports = db;