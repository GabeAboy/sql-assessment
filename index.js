var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    db.user_create_seed(function(err,res){
      console.log(err);
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(err,res){
      console.log(err);
      console.log("Vehicle Table Init")
    });
});
app.get('/api/users',function(req,res) {
  db.getAllUser(function(err,users) {
    if(!err)res.status(200).send(users)
    else res.status(500).send(err)
  })
})
//
app.get('/api/vehicles',function(req,res) {
  db.getAllVehicles(function(err,vehicles) {

    if(!err){
      res.status(200).send(vehicles)
    }
    else res.status(500).send(err)
  })
})
app.post('/api/users',function(req,res) {
  db.addUser([req.body.firstname,req.body.lastname,req.body.email],function(err,response) {
    console.log(err);
    if(!err){
        res.status(200).send(response);
      }
      else res.status(422).send(err);
  })
})
app.post('/api/vehicles',function(req,res) {

  db.addVehicle([req.body.make,req.body.model,req.body.year,req.body.ownerID],function(err,response) {
    if(!err){
        res.status(200).send(response);
      }
      else res.status(422).send(err);
  })
})
app.get('/api/user/:userId/vehiclecount',function(req,res) {
  var x = Number(req.params.userId)
  db.vehicleCount([req.params.userId],function (err,response) {

    if(!err){
      var n = Number(response[0].count)
        res.status(200).send({count:n});
      }
      else res.status(422).send(err);
  })
})
app.get('/api/user/:userId/vehicle',function(req,res) {
  db.vehicleAll([req.params.userId],function(err,response) {
    if(!err){
        res.status(200).send(response);
      }
      else res.status(422).send(err);
  })
})
app.get('/api/vehicle/',function(req,res) {
 console.log('here',req.query);
 if(req.query.UserEmail) {
		db.getVehiclesByEmail([req.query.UserEmail], function(err, vehicles) {
			if (!err) {
				res.status(200).send(vehicles);
			} else {
				res.status(500).send(err);
			}
		})
	} else if (req.query.userFirstStart) {
    console.log(req.query);
		var queryString = req.query.userFirstStart + "%";
    console.log(queryString);
		db.vehicleByName([queryString], function(err, vehicles) {
      console.log(err);
			if (!err) {
				res.status(200).send(vehicles);
			} else {
				res.status(500).send(err);
			}
		})
	} else {
		res.status(501).send("Unacceptable Query Parameter Name");
}
})
//
app.get('/api/newervehiclesbyyear',function(req,res) {
  db.getNewerVehicles_sorted(function(err, vehicles) {
  if (!err) {
    res.status(200).send(vehicles);
  } else {
    res.status(500).send(err);
  }
})
})
app.get('/api/vehicle/:vehicleId/user/:userId',function(req,res) {
  db.updateVehicle_owner([parseInt(req.params.userId),parseInt(req.params.vehicleId)], function(err, vehicle) {
		if (!err) {
			res.status(200).send();
		} else {
			res.status(500).send(err);
		}
	})
})
app.delete('/api/user/:userId/vehicle/:vehicleId',function(req,res) {
  db.removeVehicle_owner([parseInt(req.params.userId),parseInt(req.params.vehicleId)], function(err, vehicle) {
  if (!err) {
    res.status(200).send();
  } else {
    res.status(500).send(err);
  }
})

})
app.delete('/api/vehicle/:vehicleId',function(req,res) {
  db.destroyVehicle([parseInt(req.params.vehicleId)], function(err, vehicle) {
  if (!err) {
    res.status(200).send("Vehicle Deleted");
  } else {
    res.status(500).send(err);
  }
})

})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
