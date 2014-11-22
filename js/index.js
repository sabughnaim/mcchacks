var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Parse = require('parse').Parse;

Parse.initialize("J2Aoe4j2ht4F8Xz3E6uhS8NKRC9V3UpF2hjU2ToR", "lROdyJFYyYnxqcSQWeGVJQp8XBbRUNwlWTX3aSP1");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  alert("yay! it worked");
});



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	var room = socket.rooms;
    io.to(room).emit('chat message', msg);
    console.log('' + socket.rooms);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
