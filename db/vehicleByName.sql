
SELECT  v.make, v.model, v.year,u.firstname FROM Vehicles v
JOIN users u ON u.id=v.ownerid
where u.firstname like $1
