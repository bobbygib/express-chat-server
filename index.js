var MongoClient = require("mongodb").MongoClient
var ObjectId = require("mongodb").ObjectId
MongoClient.connect("mongodb://localhost", function(err, db) {
	if (err){
		console.log(err)
	}
	var express = require("express")

	var app = express()

//set up req.body
// do the actual data stream collection into an object
	var bodyParser = require("body-parser");
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	var messages = [];

	app.get("/", function(req, res){
		//__dirname is to get the whole current drectory name
		res.sendFile(__dirname + "/index.html")
	});

	//get /chat
	app.get("/chat/:id", function(req, res){
		//takes array and puts it into string
		var id = req.params.id
		db.collection("message").findOne({_id: ObjectId(id)}, function(err, data){
			if (err){
				res.send(err)
			}
			res.send(JSON.stringify(data));
		})
	});

	//post /chat
	app.post("/chat", function(req, res){
		var obj = req.body.message;
		db.collection("message").insertOne(obj, function(err, data){
			if(err){
				res.send("error")
			} 
			res.send(JSON.stringify({message: "success", id: data.ops[0]._id}))
		})
	});

	//individual messages
	app.get('/person/:name', function(req, res){
		var pName  = req.params.name;
		var nArr = [];
		for (var i = 0; i < messages.length; i++){
			if (messages[i].name === pName){
				nArr.push(messages[i].msg)
			}
		} 
		res.send(JSON.stringify(nArr));
	});

	app.use(function(req, res, next){
		res.status(404)
		res.send("404 File not found")
	});

	app.use(function(err, req, res, next){
		console.log(err)
		res.status(500);
		res.send("500 Internal server error")
	});

	app.listen(8080, function(){
		console.log("SEVERSTARTED")
	})
})