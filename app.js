var express = require('express');
var app = express();
var path = require('path');

// board
var five = require("johnny-five");
var EtherPort = require("etherport");
//var board = new five.Board({ 
//  port: new EtherPort(3030) 
//});
var led;

var server = app.listen(5555, function() {
	console.log('Program running on port : 5555');
});
var io = require('socket.io').listen(server);

app.use(express.static('/'));
app.use(express.static('asset'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/index2.html', function(req, res) {
	res.sendFile(path.join(__dirname+'/index2.html'));
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('eqData', function(data) {
		console.log(data);
		//led.blink(100);
		//setTimeout(function() { 
		//	led.off();
		//}, 2000);
		
	});

	//board.on("ready", function() {
	//  console.log("Ready!");
	//  led = new five.Led(8);
	//  led.on();
	//  this.on("exit", function() {
    //	led.off();
  	//});
	//});
});