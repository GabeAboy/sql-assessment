-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS Vehicles;
DROP SEQUENCE IF EXISTS vehicle_pk;
CREATE SEQUENCE public.vehicle_pk
  INCREMENT 1
  START 1
  MINVALUE 1
;
CREATE TABLE Vehicles(
  id INTEGER NOT NULL DEFAULT nextval('vehicle_pk'),
  make VARCHAR(30),
  model VARCHAR(30),
  year INTEGER,
  ownerId integer,
  PRIMARY KEY(id),
  FOREIGN KEY(ownerId) REFERENCES Users(id)
);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('Toyota', 'Camry', 1991, 1);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('Honda', 'Civic', 1995, 1);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('Ford', 'Focus', 2005, 1);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('Ford', 'Taurus', 2003, 2);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('VW', 'Bug', 2010, 2);
INSERT INTO Vehicles (make,model,year,ownerId) VALUES('Mini', 'Coup', 2013, 3);
