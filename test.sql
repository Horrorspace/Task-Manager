CREATE OR REPLACE FUNCTION test() RETURNS INT AS $$
    DECLARE
        x INT;
    BEGIN
        x := random()*(2147483647-1+1))+1;
        RETURN x + 1;
    END
$$ LANGUAGE PLpgSQL;

SELECT test();

DROP FUNCTION test();