import sqlite3 from "sqlite3";

const db = new sqlite3.Database("../server/data/database.db");

db.all('SELECT * FROM "all"', (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(JSON.stringify(rows, null, 2));
  }
});

db.close();
