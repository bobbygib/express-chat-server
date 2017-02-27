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
app.get("/chat", function(req, res){
	//takes array and puts it into string
	res.send(JSON.stringify(messages))
});

//post /chat
app.post("/chat", function(req, res){
	if(req.body.message) {
		messages.push(req.body.message);
		res.send("sucsess");
	} else {
		res.send("error erro err er e _")
	}
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
});