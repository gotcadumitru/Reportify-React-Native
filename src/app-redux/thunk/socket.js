import openSocket from 'socket.io-client';
var socket = openSocket('http://192.168.149.22:8080');
// var socket = {};

export default socket;

export function socket_init() {
  console.log('connected to socket');
}
