var rudp = require('./rudp');
var dgram = require('dgram');

var socket = dgram.createSocket('udp4');
var echoServerAddress = '80.240.22.240'
var echoServerPort = 8823

var connection = new rudp.Connection(new rudp.PacketSender(socket, echoServerAddress, echoServerPort));
socket.on('message', function (message, rinfo) {
	try {
		var packet = new rudp.Packet(message);
	    connection.receive(packet);
	} catch (err) {
		console.log(err);
    }
});

connection.on('data', (data) => {
	console.log(data.toString())
})

connection.send(Buffer.from('TEST'));