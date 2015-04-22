var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

// var server = app.listen(6780, function() {
// 	console.log('Express server listening on port ' + server.address().port);
// });

var http = require('http').Server(app);
http.listen(6780, function(){
  console.log('listening on *:6780');
});

// Attach the socket server
var io = require('socket.io')(http);

// Listen for incoming socket connections from any client
io.on('connection', function(socket){
  console.log('a user connected');

	// When the given socket is disconnected, print a message
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

	// When the client emits a 'message', print it here
	socket.on('message', function(message){
    console.log('message: ' + message);
    socket.broadcast.emit('message',message)
    // 
    // goal is to send to all clients
    // io.emit('message',message);
;
  });
});
