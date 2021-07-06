CREATE DATABASE task_manager;
CREATE ROLE admin WITH LOGIN PASSWORD 'KQoEgwBi';
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255), 
  email VARCHAR(255),
  password VARCHAR(255) 
);
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  created TIMESTAMP WITH TIME ZONE,
  date_to_do TIMESTAMP WITH TIME ZONE,
  task TEXT,
  is_priority BOOLEAN,
  is_complete BOOLEAN,
  is_cancel BOOLEAN,
  is_delete BOOLEAN
);
INSERT INTO users VALUES (0, 'admin', 'admin@hey.com', 'hwegweKWHJEG');
COPY users TO '/var/lib/postgresql/12/logs/task_manager/data.csv' WITH CSV DELIMITER ',';
SELECT users.email FROM users;

DROP TABLE tasks;
DROP TABLE users;
DROP ROLE admin;
DROP DATABASE task_manager;