var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
		console.log(socket.id + " has joined");
		socket.emit('users',Object.keys(io.engine.clients))

		socket.on('connect_new',function(){
			socket.broadcast.emit('users',Object.keys(io.engine.clients))
		})

		socket.on('chat message',function(msg){
			socket.broadcast.emit('chat message',msg);
		})
		socket.on('writing',function(name){
			socket.broadcast.emit('writing',name);
		})
		socket.on('disconnect',function(){
			socket.broadcast.emit('users',Object.keys(io.engine.clients),socket.id)
		})
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
