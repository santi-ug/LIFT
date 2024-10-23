sqlite3 liftsqlite.db

CREATE TABLE IF NOT EXISTS todoData (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  value TEXT NOT NULL
);

INSERT INTO todoData (value) VALUES ('First todo');

SELECT * FROM todoData;