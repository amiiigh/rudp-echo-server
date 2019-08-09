var rudp = require('./rudp');
var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

socket.bind(8823);

console.log('UDP socket bound to port 8823');

var server = new rudp.Server(socket);

server.on('connection', function (connection, addressKey) {
  connection.on('data', function (data) {
  	let replayMessage = Buffer.from(addressKey);
    console.log(addressKey);
    connection.send(replayMessage)
  });
});
