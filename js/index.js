var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Parse = require('parse').Parse;

Parse.initialize("J2Aoe4j2ht4F8Xz3E6uhS8NKRC9V3UpF2hjU2ToR", "lROdyJFYyYnxqcSQWeGVJQp8XBbRUNwlWTX3aSP1");
var test = "lies lies lies ";

    var Sock = Parse.Object.extend("Sock");
	var sock = new Sock();
	var query = new Parse.Query(Sock);
	var users = [];
	var list = [];
	sock.set("random", Math.random())
	sock.save();
	var state = 0;
	var room;
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

  	console.log('username: ' + socket.username + ' rooms: ' + socket.rooms + ' list of things: ' + users[0] + ' ' + list[0]);

	// if (socket.id == "t") {
	// 	if (socket.rooms > 1)
	// 		room = socket.rooms[1];
	// 	else if (socket.rooms == 1)
	// 		room = socket.rooms[0];
	// }
	// if(socket.id == "l") {
	// 	if (socket.rooms > 1)
	// 		room = socket.rooms[1];
	// 	else if (socket.rooms == 1)
	// 		room = socket.rooms[0];
	// }

	if (socket.rooms.length > 1){
		io.to(socket.rooms[1]).emit('chat message', msg);
		console.log(socket.rooms[1]);
	}
	else
		io.to(socket.rooms[0]).emit('chat message', msg);
  	// io.to(socket.rooms[0]).emit('chat message', msg);
  	// io.to(socket.rooms[1]).emit('chat message', msg);

  	// if (socket.username == users[0]) {
  	// 	socket.join(list[0]);
  	// 	console.log(socket.rooms)
  		
  	// }

  	// if (socket.username == list[0]) {
  	// 	socket.join(users[0]);
  	// 	console.log(socket.rooms)
  	// 	io.to(users[0]).emit('chat message', msg);
  	// }
    
    
  });

  socket.on('adduser', function(type) {

  	

  	if (type == "t") {
  		users.push(socket.rooms);
  		socket.username = socket.rooms;
  		console.log(type + socket.username);
  	}
  	
  	else if (type == "l") {
  		list.push(socket.rooms);
  		socket.username = socket.rooms;
  		console.log(type + socket.username);
   	}

  	else {
  		socket.username = "a;sldkfja;sd"
  	}


 //  	sock.set("socketid", room);
	// sock.save();
  });

  socket.on('bind', function(type) {
  	if (type == "t") {
  		socket.join(list[0]);
  		list.splice(0,1);
  		var index = users.indexOf(socket.username);
  		users.splice(index,1);
  	}

  	if (type == "l") {
  		socket.join(users[0]);
  		users.splice(0,1);
  		var index = list.indexOf(socket.username);
  		list.splice(index,1);
  	}

  });

  // socket.on('disconnect', function() {
  // 	console.log('user gone')
  // 	sock.destroy();
  // });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
