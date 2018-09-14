var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
	//console.log('hello');
 socket.broadcast.emit('user connected');
});

 io.on('connection', function(socket) {
 		//console.log('a user connected');
	socket.on('chat message', function(msg) {
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	//console.log('message: ' + msg);
	io.emit('chat message', msg);
		
	});
});

http.listen(4000, function() {
	console.log('listening on *:4000');
});

