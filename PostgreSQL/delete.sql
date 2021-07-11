DROP FUNCTION get_id_by_email(email VARCHAR(255));
DROP FUNCTION get_new_id(type VARCHAR(255));
DROP FUNCTION get_random_id(type VARCHAR(255));
DROP FUNCTION user_insert(name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));
DROP FUNCTION task_insert(email VARCHAR(255), date_to_do TIMESTAMP WITH TIME ZONE,
title VARCHAR(255), task TEXT);


DROP TABLE tasks;
DROP TABLE users;
DROP ROLE admin;
DROP DATABASE task_manager;