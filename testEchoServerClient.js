var rudp = require('./rudp');
var dgram = require('dgram');

var socket = dgram.createSocket('udp4');
var echoServerAddress = 'localhost'
var echoServerPort = 8823

var connection = new rudp.Connection(new rudp.PacketSender(socket, echoServerAddress, echoServerPort));
socket.on('message', function (message, rinfo) {
    var packet = new rudp.Packet(message);
    connection.receive(packet);
});

connection.on('data', (data) => {
	console.log(data.toString())
})

connection.send(Buffer.from('TEST'));