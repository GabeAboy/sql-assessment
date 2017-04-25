SELECT u.firstname, u.lastname, v.id, v.make, v.model, v.year, v.ownerid
FROM vehicles v
JOIN users u ON u.id=v.ownerid
WHERE v.year > 2000
ORDER BY v.year DESC;
