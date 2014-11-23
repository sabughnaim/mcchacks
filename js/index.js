var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Parse = require('parse').Parse;

Parse.initialize("J2Aoe4j2ht4F8Xz3E6uhS8NKRC9V3UpF2hjU2ToR", "lROdyJFYyYnxqcSQWeGVJQp8XBbRUNwlWTX3aSP1");
var test = "lies lies lies ";

    var Sock = Parse.Object.extend("Sock");
	var sock = new Sock();
	var query = new Parse.Query(Sock);
	sock.set("random", Math.random())
	sock.save();
// sock.set("socketid", test);
// sock.save();
// var SockCollection = Parse.Collection.extend({model: Sock});
// var collection = new SockCollection();





app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	// var id = socket.rooms;
	// var room = id[0];
 //    sock.set("socketid", room);
	// sock.save();

  socket.on('chat message', function(msg){

    io.to(socket.rooms).emit('chat message', msg);
    
  });

  socket.on('adduser', function(room) {
  	sock.set("socketid", room);
	sock.save();
  })

  // socket.on('disconnect', function() {
  // 	console.log('user gone')
  // 	sock.destroy();
  // });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
