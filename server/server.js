// const io = require('socket.io')();
// const SimplePeer = require('simple-peer');

// //export const server = () => {
//   peers = [];
//   io.on('connection', (client) => {
//   console.log(client)
  
//     client.on('disconnect', () => {
//       console.log("A client disconnected");
//     });

//     client.on('host', (host) => {
//       console.log(host);
//     });

//     client.on('data', (data) => {
//       var rtc = new SimplePeer({initiator: false, trickle: false});
//       rtc.signal(data);

//       rtc.on('signal', function(data) {
//         socket.send(data);
//       });
   
//       rtc.on('connect', function() {
//         peers.push(rtc);
//       });
   
//       rtc.on('data', function(msg) {
//         emitter.emit('message', msg);
   
//         //as host, we need to broadcast the data to the other peers
//         peers.forEach(function(p) {
//           if(p === rtc) {
//             return;
//           }
   
//           p.send(msg);
//         });
//       });
//     })
//   });

//   const port = 8000;
//   io.listen(port);
//   console.log('listening on port ', port);
// //}

var server = require('http').createServer();
var p2pserver = require('socket.io-p2p-server').Server
var io = require('socket.io')(server)

server.listen(8000, function () {
  console.log('Listening on 8000')
})

io.use(p2pserver)

io.on('connection', function (socket) {
  console.log('something connected')
  socket.on('start-stream', function (data) {
    console.log('Stream started')
    socket.broadcast.emit('start-stream', data)
    console.log('Stream broadcast')
  })
});
