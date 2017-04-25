UPDATE vehicles
SET ownerid=NULL
WHERE ownerid=$1 AND id=$2;
