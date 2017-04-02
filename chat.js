var http = require('http');
var express = require('express');
var port = process.env.PORT || 4000;
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
	

app.use(express.static(__dirname + "/public"));

io.on('connection', function(clientSocket){

	console.log('User is connected');
	  
	clientSocket.on('disconnect', function(){
		console.log('User is disconnected');
	});

	clientSocket.on('chat-message', function(msg){
		io.emit('chat-message', 'Server sending to all users: ' + msg);
	});
});


server.listen(3000, function(){
  console.log('Server is listening on :3000');
});