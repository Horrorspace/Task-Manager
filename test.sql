CREATE OR REPLACE FUNCTION test() RETURNS INT AS $$
    DECLARE
        x float8;
    BEGIN
        x := random();
        x := x*(2147483647-1+1)+1; 
        RETURN x;
    END
$$ LANGUAGE PLpgSQL;

SELECT test();

DROP FUNCTION test();
