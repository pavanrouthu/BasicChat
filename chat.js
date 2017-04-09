var http = require('http');
var express = require('express');
var port = process.env.PORT || 4000;
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = {};
	
app.use(express.static(__dirname + "/"));
console.log(__dirname);

app.get('/', function(request, response) {
 response.sendFile(__dirname + '/Public/index.html');
 });

io.on('connection', function(clientSocket){

	clientSocket.on('join', function(name){
		if (name == ""){
			name = "Guest" + Math.round(random(100, 999));
		}
		users[clientSocket.id] = name;
		clientSocket.emit('update', "You have connected to the chat room!!");
		io.sockets.emit('update', "Hello everybody, " + name + " has joined the chat room, send a message!");
		function random (low, high) {
    			return Math.random() * (high - low) + low;
		}
	});

	console.log('User is connected');
	  
	clientSocket.on('disconnect', function(){
		console.log('User is disconnected');

	});

	clientSocket.on('chat-message', function(msg){
		io.emit('chat-message', users[clientSocket.id], msg);
	});
});


server.listen(port, function(){
  console.log('Server is listening on :' + port);
});