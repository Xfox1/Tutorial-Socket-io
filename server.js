var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//res.send('<h1>Hello world!</h1>');
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.emit('notification', "Utente connesso");	

	console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log(msg.nick + ' send: ' + msg.msg);
		
		io.emit('chat message', msg);
	});	

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

var port = 3000;
if(process.argv[2] != null){
	port = process.argv[2];
}

http.listen(port, function(){
	console.log('listening on 127.0.0.1:'+port);
});
