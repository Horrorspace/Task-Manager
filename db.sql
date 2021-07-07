CREATE DATABASE task_manager;
CREATE ROLE admin WITH LOGIN PASSWORD 'KQoEgwBi';
CREATE TABLE users(
  id SERIAL PRIMARY KEY DEFAULT random()*(2147483647-1+1))+1,
  name VARCHAR(255), 
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) 
);
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY DEFAULT random()*(2147483647-1+1))+1,
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  created TIMESTAMP WITH TIME ZONE,
  date_to_do TIMESTAMP WITH TIME ZONE,
  task TEXT,
  is_priority BOOLEAN DEFAULT false,
  is_complete BOOLEAN DEFAULT false,
  is_cancel BOOLEAN DEFAULT false,
  is_delete BOOLEAN DEFAULT false
);
INSERT INTO users VALUES (1, 'admin', 'admin@hey.com', 'hwegweKWHJEG');
COPY users TO '/var/lib/postgresql/12/logs/task_manager/data.csv' WITH CSV DELIMITER ',';
INSERT INTO tasks VALUES (1, '1', 'admin@hey.com', 'hwegweKWHJEG');
COPY users TO '/var/lib/postgresql/12/logs/task_manager/data.csv' WITH CSV DELIMITER ',';
SELECT * FROM users;
SELECT * FROM tasks;

DROP TABLE tasks;
DROP TABLE users;
DROP ROLE admin;
DROP DATABASE task_manager;
