CREATE OR REPLACE FUNCTION get_new_id(type VARCHAR(255)) RETURNS INT AS $$
  DECLARE
    i integer := 0;
    is_uniq BOOLEAN := true;
    res FLOAT8;
    val FLOAT8;
    r INT;
  BEGIN
    WHILE i < 20 LOOP
      res := random();
      res := res*(2147483647-1+1)+1;
      i := i + 1;
      is_uniq := true;
      IF type = 'users' THEN
        FOR r IN SELECT id FROM users
        LOOP
          val := r;
          IF res <> val 
          THEN
            is_uniq := true;
          ELSE
            is_uniq := false;
          END IF;
        END LOOP;
      ELSIF type = 'tasks' THEN
        FOR r IN SELECT id FROM tasks
        LOOP
          val := r;
          IF res <> val 
          THEN
            is_uniq := true;
          ELSE
            is_uniq := false;
          END IF;
        END LOOP;
      ELSE
        res := 1;
        is_uniq := false;
      END IF;
      IF is_uniq = true
      THEN
        i := 100;
        RETURN res;
      END IF;
    END LOOP;
  END 
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION get_random_id(type VARCHAR(255)) RETURNS INT AS $$
  DECLARE
    r INT;
    val INT;
  BEGIN
    IF type = 'users' THEN
      FOR r IN SELECT id FROM users
      LOOP
        val := r;
      END LOOP;
    ELSIF type = 'tasks' THEN
      FOR r IN SELECT id FROM tasks
      LOOP
        val := r;
      END LOOP;
    ELSE
        val := 1;
    END IF;
    RETURN val;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION get_id_by_email(email VARCHAR(255)) RETURNS INT AS $$
  DECLARE
    userid INT;
  BEGIN
    SELECT users.id INTO userid
        FROM users WHERE users.email = get_id_by_email.email;
    RETURN userid;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION toggle_priority(id INT) RETURNS VOID AS $$
  DECLARE
    is_priority BOOLEAN;
  BEGIN
    SELECT tasks.is_priority INTO is_priority
        FROM tasks WHERE tasks.id = toggle_priority.id;
    IF is_priority = true THEN
      UPDATE tasks SET is_priority = false WHERE tasks.id = toggle_priority.id;
    ELSE
      UPDATE tasks SET is_priority = true WHERE tasks.id = toggle_priority.id;
    END IF;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION toggle_complete(id INT) RETURNS VOID AS $$
  DECLARE
    is_complete BOOLEAN;
  BEGIN
    SELECT tasks.is_complete INTO is_complete
        FROM tasks WHERE tasks.id = toggle_complete.id;
    IF is_complete = true THEN
      UPDATE tasks SET is_complete = false WHERE tasks.id = toggle_complete.id;
    ELSE
      UPDATE tasks SET is_complete = true WHERE tasks.id = toggle_complete.id;
      UPDATE tasks SET date_complete = current_timestamp WHERE tasks.id = toggle_complete.id;
    END IF;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION toggle_cancel(id INT) RETURNS VOID AS $$
  DECLARE
    is_cancel BOOLEAN;
  BEGIN
    SELECT tasks.is_cancel INTO is_cancel
        FROM tasks WHERE tasks.id = toggle_cancel.id;
    IF is_cancel = true THEN
      UPDATE tasks SET is_cancel = false WHERE tasks.id = toggle_cancel.id;
    ELSE
      UPDATE tasks SET is_cancel = true WHERE tasks.id = toggle_cancel.id;
      UPDATE tasks SET date_cancel = current_timestamp WHERE tasks.id = toggle_cancel.id;
    END IF;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION toggle_delete(id INT) RETURNS VOID AS $$
  DECLARE
    is_delete BOOLEAN;
  BEGIN
    SELECT tasks.is_delete INTO is_delete
        FROM tasks WHERE tasks.id = toggle_delete.id;
    IF is_delete = true THEN
      UPDATE tasks SET is_delete = false WHERE tasks.id = toggle_delete.id;
    ELSE
      UPDATE tasks SET is_delete = true WHERE tasks.id = toggle_delete.id;
      UPDATE tasks SET date_delete = current_timestamp WHERE tasks.id = toggle_delete.id;
    END IF;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION user_insert(name VARCHAR(255), email VARCHAR(255), password VARCHAR(255)) RETURNS VOID AS $$
  DECLARE
  BEGIN
    INSERT INTO users VALUES (get_new_id('users'), name, email, password);
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION task_insert(email VARCHAR(255), date_to_do TIMESTAMP WITH TIME ZONE,
title VARCHAR(255), task TEXT) RETURNS VOID AS $$
  DECLARE
    user_id INT := get_id_by_email(task_insert.email);
    created_date TIMESTAMP WITH TIME ZONE := current_timestamp;
  BEGIN
    INSERT INTO tasks (id, user_id, created, date_to_do, title, task) 
    VALUES (get_new_id('tasks'), get_random_id('users'), created_date,
    '2004-10-19 10:23:54+02', 'TEST', 'testing');
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION date_todo_up(id INT, date_to_do TIMESTAMP WITH TIME ZONE) RETURNS VOID AS $$
  DECLARE
  BEGIN
    UPDATE tasks SET date_to_do = date_todo_up.date_to_do WHERE tasks.id = date_todo_up.id;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION title_up(id INT, title VARCHAR(255)) RETURNS VOID AS $$
  DECLARE
  BEGIN
    UPDATE tasks SET title = title_up.title WHERE tasks.id = title_up.id;
  END
$$ LANGUAGE PLpgSQL;


CREATE OR REPLACE FUNCTION task_up(id INT, task TEXT) RETURNS VOID AS $$
  DECLARE
  BEGIN
    UPDATE tasks SET task = task_up.task WHERE tasks.id = task_up.id;
  END
$$ LANGUAGE PLpgSQL;




CREATE DATABASE task_manager;
CREATE ROLE admin WITH LOGIN PASSWORD 'KQoEgwBi';
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255), 
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) 
);
CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  created TIMESTAMP WITH TIME ZONE,
  date_to_do TIMESTAMP WITH TIME ZONE,
  date_complete TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  date_cancel  TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  date_delete  TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  title VARCHAR(255),
  task TEXT,
  is_priority BOOLEAN DEFAULT false,
  is_complete BOOLEAN DEFAULT false,
  is_cancel BOOLEAN DEFAULT false,
  is_delete BOOLEAN DEFAULT false
);


/*
SELECT user_insert('admin', 'admin@hey.com', 'hwegweKWHJEG');
SELECT user_insert('1', '1@hey.com', 'hwegweKWHJEG');
SELECT user_insert('2', '2@hey.com', 'hwegweKWHJEG');
SELECT user_insert('3', '3@hey.com', 'hwegweKWHJEG');


SELECT task_insert('3@hey.com', '2004-10-19 10:23:54+02', 'TEST', 'testing');
SELECT task_insert('3@hey.com', '2004-10-19 10:23:54+02', 'TEST', 'testing');
SELECT task_insert('3@hey.com', '2004-10-19 10:23:54+02', 'TEST', 'testing');

SELECT toggle_priority(get_random_id('tasks'));
SELECT date_todo_up(get_random_id('tasks'), '2012-10-19 10:23:54+02');
SELECT title_up(get_random_id('tasks'), 'UP');
SELECT task_up(get_random_id('tasks'), 'Update');


SELECT * FROM users;
SELECT id, title, task, is_priority, date_to_do FROM tasks;
*/

--COPY users TO '/var/lib/postgresql/12/logs/task_manager/data.csv' WITH CSV DELIMITER ',';
--COPY users TO '/var/lib/postgresql/12/logs/task_manager/data.csv' WITH CSV DELIMITER ',';