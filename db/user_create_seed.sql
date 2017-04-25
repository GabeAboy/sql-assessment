-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS Users;
DROP SEQUENCE IF EXISTS user_pk;
CREATE SEQUENCE public.user_pk
   	INCREMENT 1
    START 1
    MINVALUE 1
;
CREATE TABLE Users(
  id INTEGER NOT NULL DEFAULT nextval('user_pk'),
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  email VARCHAR(30),
  PRIMARY KEY(id)
);

INSERT INTO Users (firstname,lastname,email) VALUES( 'John', 'Smith', 'John@Smith.com');
INSERT INTO Users (firstname,lastname,email) VALUES( 'Dave', 'Davis', 'Dave@Davis.com');
INSERT INTO Users (firstname,lastname,email) VALUES( 'Jane', 'Janis', 'Jane@Janis.com');
