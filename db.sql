CREATE DATABASE task_manager;
CREATE ROLE db_user WITH LOGIN 'db_user' PASSWORD 'KQoEgwBi';
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255), 
  email VARCHAR(255),
  password VARCHAR(255) 
);
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES users (id),
  created TIMESTAMP WITH TIME ZONE,
  date_to_do TIMESTAMP WITH TIME ZONE,
  task TEXT,
  is_priority BOOLEAN
  is_complete BOOLEAN
  is_cancel BOOLEAN
  is_delete BOOLEAN
);

DROP TABLE tasks;
DROP TABLE users;
DROP ROLE db_user;
DROP DATABASE task_manager;
