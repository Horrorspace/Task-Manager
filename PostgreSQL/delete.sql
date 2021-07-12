DROP FUNCTION get_id_by_email(email VARCHAR(255));
DROP FUNCTION get_new_id(type VARCHAR(255));
DROP FUNCTION get_random_id(type VARCHAR(255));
DROP FUNCTION toggle_priority(id INT);
DROP FUNCTION toggle_complete(id INT);
DROP FUNCTION toggle_cancel(id INT);
DROP FUNCTION toggle_delete(id INT);
DROP FUNCTION user_insert(name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));
DROP FUNCTION task_insert(email VARCHAR(255), date_to_do TIMESTAMP WITH TIME ZONE,
title VARCHAR(255), task TEXT);
DROP FUNCTION date_todo_up(id INT, date_to_do TIMESTAMP WITH TIME ZONE);
DROP FUNCTION title_up(id INT, title VARCHAR(255));
DROP FUNCTION task_up(id INT, task TEXT);


DROP TABLE tasks;
DROP TABLE users;
DROP ROLE admin;
DROP DATABASE task_manager;