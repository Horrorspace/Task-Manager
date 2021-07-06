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
  FOREIGN KEY (user_id) REFERENCES users (id)
  times TIMESTAMP WITH TIME ZONE ARRAY
  tasks TEXT ARRAY
);

DROP TABLE tasks;
DROP TABLE users;
DROP ROLE db_user;
DROP DATABASE task_manager;
